const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

module.exports = async (req, res, next) => {
  
    try {
      const { authorization } = req.headers;
      if (!authorization) {
      return res
        .status(401)
        .json({ message: "Must inform authorization token" });
    }
      const decoded = jwt.verify(authorization, SECRET);
      const user = decoded;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Authorization header invalid" });
    }
};
