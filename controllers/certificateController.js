const {
  getAllCertificates,
  getCertificatesByEmail,
  getCertificateByCertificateId,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  verifyEmail,
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

// Get a certificate by Email
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
    console.error("Error fetching certificates by email:", error);
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

// Controller to verify if an email exists
exports.verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const certificate = await verifyEmail(email); // Call the service function
    res.status(200).json({ message: "Email exists", certificate });
  } catch (error) {
    if (error.message === "Email not found in our records.") {
      return res.status(404).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "An error occurred while verifying the email." });
  }
};
