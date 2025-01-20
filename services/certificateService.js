const XLSX = require("xlsx");
const Certificate = require("../models/Certificate");

// Get all certificates
const getAllCertificates = async () => {
  console.log("GET ALL CERTIFICATES");
  return await Certificate.find();
};

// Get a single certificate by ID
const getCertificateById = async (id) => {
  console.log("GET CERTIFICATE BY ID: ", id);
  return await Certificate.findById(id);
};

// Get a certificate by `certificateId` field
const getCertificateByCertificateId = async (certificateId) => {
  console.log("GET CERTIFICATE BY CERTIFICATE ID: ", certificateId);
  return await Certificate.findOne({ certificateId });
};

// Get all certificates by `email` field
const getCertificatesByEmail = async (email) => {
  console.log("GET CERTIFICATES BY EMAIL: ", email);
  return await Certificate.find({ email });
};

// Verify if an email exists in the database
const verifyEmail = async (email) => {
  console.log("VERIFY EMAIL: ", email);
  const certificate = await Certificate.findOne({ email });
  if (!certificate) {
    throw new Error("Email not found in our records.");
  }
  return certificate;
};

// Create a new certificate
const createCertificate = async (data) => {
  console.log("CREATE A CERTIFICATE: ", data);
  const certificate = new Certificate(data);
  return await certificate.save();
};

// Update a certificate by ID
const updateCertificate = async (id, data) => {
  console.log("UPDATE A CERTIFICATE: ", id);
  return await Certificate.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a certificate by ID
const deleteCertificate = async (id) => {
  console.log("DELETE A CERTIFICATE: ", id);
  return await Certificate.findByIdAndDelete(id);
};

// Bulk upload certificates from an Excel file
const uploadCertificatesFromExcel = async (fileBuffer) => {
  console.log("UPLOAD CERTIFICATES FROM EXCEL");
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const parseExcelDate = (excelDate) => {
    if (!excelDate) return null;

    // If it's a number (Excel stores dates as serial numbers)
    if (!isNaN(excelDate)) {
      return new Date((excelDate - 25569) * 86400 * 1000);
    }

    // If it's a string in format "DD/MM/YY"
    if (typeof excelDate === "string") {
      const parts = excelDate.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JS
        const year = parseInt(parts[2], 10);

        // Handling two-digit year conversion
        const fullYear = year < 50 ? 2000 + year : 1900 + year; // Assumes 1950-2049 range

        return new Date(fullYear, month, day);
      }
    }

    return null; // Return null if format is unrecognized
  };

  // Map Excel column names to match database schema if necessary
  const formattedData = rawData.map((row) => ({
    name: row["Name"]?.trim(),
    type: row["Type"]?.trim(),
    issueDate: parseExcelDate(row["Issue Date"]), // Fix here
    certificateId: row["Certificate ID"]?.trim(),
    rollNo: row["Roll No."]?.trim(),
    email: row["Email"]?.trim(),
    org: row["Org"]?.trim(),
  }));

  console.log("Formatted Data for DB:", formattedData);

  try {
    const certificates = await Certificate.insertMany(formattedData, {
      ordered: false,
    });
    console.log("Inserted Certificates:", certificates);
    return certificates;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Duplicate certificate IDs found in the Excel file.");
    }
    throw new Error("Error processing the Excel file.");
  }
};

// Get certificates by organization
const getCertificatesByOrganization = async (org) => {
  console.log("GET CERTIFICATES BY ORGANIZATION: ", org);
  return await Certificate.find({ org });
};

// Search certificates dynamically
const searchCertificates = async (query) => {
  console.log("SEARCH CERTIFICATES WITH QUERY: ", query);
  const searchCriteria = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
      { rollNo: { $regex: query, $options: "i" } },
    ],
  };
  return await Certificate.find(searchCriteria);
};

// Count total certificates
const countCertificates = async () => {
  console.log("COUNT CERTIFICATES");
  return await Certificate.countDocuments();
};

// Get recently added certificates
const getRecentCertificates = async (limit = 10) => {
  console.log(`GET RECENT CERTIFICATES, LIMIT: ${limit}`);
  return await Certificate.find().sort({ createdAt: -1 }).limit(limit);
};

module.exports = {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getCertificateByCertificateId,
  getCertificatesByEmail,
  verifyEmail,
  uploadCertificatesFromExcel,
  getCertificatesByOrganization,
  searchCertificates,
  countCertificates,
  getRecentCertificates,
};
