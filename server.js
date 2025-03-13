require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");
const otpRoutes = require("./routes/otpRoutes");
const adminRoutes = require("./routes/adminRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "https://technotran-e-verify-client.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://e-verify.technotran.in",
      "https://vendor-portal.technotran.in",
      "https://admin-portal.technotran.in",
      "https://e-verify-portal-frontend-production.up.railway.app", // Added new frontend URL
    ], // Update with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // ✅ Enables reading JWT from cookies

// Connect to Database
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Technotran E-verify Portal Server");
});

// Polling the server for activeness
app.get("/api/ping", (req, res) => {
  console.info("Server is alive!");
  res.status(200).send("Server is alive!");
});

// Routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/verify", otpRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
