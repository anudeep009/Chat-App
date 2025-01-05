import jwt from "jsonwebtoken";

/**
 * Middleware to verify JSON Web Token (JWT).
 * Expects the token in the Authorization header as `Bearer <token>`.
 */
function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
}

export default verifyJWT;
