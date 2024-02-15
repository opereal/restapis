const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireSignin = (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ error: "You must be signed in" });
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(403).send({ error: "Invalid token" });
    } else {
      // append user payload to request object to be accessible
      // on our request controllers function
      req.user = payload;
      next();
    }
  });
};

module.exports = requireSignin;
