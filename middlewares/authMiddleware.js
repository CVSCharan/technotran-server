const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token =
    req.cookies?.admin_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("❌ No token found");
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request

    console.log("✅ Token Decoded:", decoded); // Debugging output

    next();
  } catch (error) {
    console.error("❌ Token Verification Failed:", error.message);
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

exports.authorizeRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient Permissions" });
    }
    next();
  };
