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
};
