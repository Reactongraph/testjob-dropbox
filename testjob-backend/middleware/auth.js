const jwt = require("jsonwebtoken");
const config = process.env;


const verifyToken = (req, res, next) => {
    console.log("Verifying token",req.headers)
  const token =req.headers['x-access-token'];
    console.log("Verifying token",token)
  if (!token) {
    res.status(401).json({
      message: "Access Denied. No token provided",
    });
  }
  try {
    console.log("++++++++++++++++++++++", process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("******", error);
  }
};

module.exports = verifyToken;