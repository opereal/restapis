const validateUserData = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: "all input fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(403).json({ error: "password does not match" });
  }

  next();
};

module.exports = { validateUserData };
