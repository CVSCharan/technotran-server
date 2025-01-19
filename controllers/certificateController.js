const {
  getAllCertificates,
  getCertificatesByEmail,
  getCertificateByCertificateId,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  verifyEmail,
  uploadCertificatesFromExcel,
  getCertificatesByOrganization,
  searchCertificates,
  countCertificates,
  getRecentCertificates,
} = require("../services/certificateService");

// Get all certificates
exports.getAll = async (req, res) => {
  try {
    const certificates = await getAllCertificates();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a certificate by Certificate ID
exports.getById = async (req, res) => {
  try {
    const certificate = await getCertificateByCertificateId(req.params.id);
    if (!certificate)
      return res.status(404).json({ error: "Certificate not found" });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get certificates by Email
exports.getByEmail = async (req, res) => {
  try {
    const certificates = await getCertificatesByEmail(req.params.email);
    if (certificates.length === 0) {
      return res
        .status(404)
        .json({ message: "No certificates found for this email" });
    }
    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching certificates by email:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get certificates by Organization
exports.getByOrganization = async (req, res) => {
  const { org } = req.query;
  try {
    const certificates = await getCertificatesByOrganization(org);
    if (certificates.length === 0) {
      return res
        .status(404)
        .json({ message: "No certificates found for this organization" });
    }
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search certificates dynamically
exports.search = async (req, res) => {
  const { query } = req.query;
  try {
    const certificates = await searchCertificates(query);
    if (certificates.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching certificates found" });
    }
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Count total certificates
exports.count = async (req, res) => {
  try {
    const count = await countCertificates();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get recently added certificates
exports.getRecent = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const certificates = await getRecentCertificates(limit);
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new certificate
exports.create = async (req, res) => {
  try {
    const certificate = await createCertificate(req.body);
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a certificate by ID
exports.update = async (req, res) => {
  try {
    const updatedCertificate = await updateCertificate(req.params.id, req.body);
    if (!updatedCertificate)
      return res.status(404).json({ error: "Certificate not found" });
    res.json(updatedCertificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a certificate by ID
exports.delete = async (req, res) => {
  try {
    const deletedCertificate = await deleteCertificate(req.params.id);
    if (!deletedCertificate)
      return res.status(404).json({ error: "Certificate not found" });
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify if an email exists
exports.verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const certificate = await verifyEmail(email);
    res.status(200).json({ message: "Email exists", certificate });
  } catch (err) {
    if (err.message === "Email not found in our records.") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

// Bulk upload certificates from Excel
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedCertificates = await uploadCertificatesFromExcel(
      req.file.buffer
    );
    res
      .status(201)
      .json({
        message: "Certificates uploaded successfully",
        uploadedCertificates,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
