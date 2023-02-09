const jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) => {
  const token =req.headers['x-access-token'];
  if (!token) {
    res.status(401).json({
      message: "Access Denied. No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("******", error);
    return error;
  }
};

module.exports = verifyToken;