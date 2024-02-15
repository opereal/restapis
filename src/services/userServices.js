const User = require("../models/userModel");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    return user;
  }
};

const getCurrentUser = async (id) => {
  const currentUser = await User.findOne({ _id: id }).select("-password");

  if (currentUser) {
    return currentUser;
  }
};

module.exports = { getUserByEmail, getCurrentUser };
