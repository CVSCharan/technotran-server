const {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../queries/certificateQueries");

// Get all certificates
exports.getAll = async (req, res) => {
  try {
    const certificates = await getAllCertificates();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a certificate by ID
exports.getById = async (req, res) => {
  try {
    const certificate = await getCertificateById(req.params.id);
    if (!certificate)
      return res.status(404).json({ error: "Certificate not found" });
    res.json(certificate);
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
