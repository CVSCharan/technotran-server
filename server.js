require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();
// Enable CORS for all routes
app.use(
  cors({
    origin: "https://technotran-e-verify-client.vercel.app", // Update with your frontend URL
    methods: "GET,POST,PUT,DELETE",
  })
);

// Middleware
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Technotran E-verify Portal Server");
});

// Poling the server for activeness
app.get("/api/ping", (req, res) => {
  console.info("Server is alive!");
  res.status(200).send("Server is alive!");
});

// Routes
app.use("/api/certificates", certificateRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
