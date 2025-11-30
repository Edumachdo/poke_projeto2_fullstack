const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });
    req.user = decoded;
    next();
  } catch (ex) {
    console.error(
      `AuthMiddleware: Invalid token from IP ${req.ip}. Error: ${ex.message}`
    );
    res.status(401).json({ error: "Invalid token." });
  }
};
