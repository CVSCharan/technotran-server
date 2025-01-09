const Certificate = require("../models/Certificate");

// Get all certificates
const getAllCertificates = async () => {
  console.log("GET ALL CERTIFICATES");
  return await Certificate.find();
};

// Get a single certificate by ID
const getCertificateById = async (id) => {
  console.log("GET ALL CERTIFICATES BY ID : ", id);
  return await Certificate.findById(id);
};

// Get a certificate by `certificateId` field
const getCertificateByCertificateId = async (certificateId) => {
  console.log("GET CERTIFICATE BY CERTIFICATE ID : ", certificateId);
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
  const certificate = await Certificate.findOne({ email }); // Adjust field as needed
  if (!certificate) {
    throw new Error("Email not found in our records.");
  }
  return certificate;
};

// Create a new certificate
const createCertificate = async (data) => {
  console.log("CREATE A CERTIFICATE : ", data);
  const certificate = new Certificate(data);
  return await certificate.save();
};

// Update a certificate by ID
const updateCertificate = async (id, data) => {
  console.log("UPDATE A CERTIFICATE : ", id);
  return await Certificate.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a certificate by ID
const deleteCertificate = async (id) => {
  console.log("DELETE A CERTIFICATE : ", id);
  return await Certificate.findByIdAndDelete(id);
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
};
