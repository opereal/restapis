const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { getUserByEmail, getCurrentUser } = require("../services/userServices");

// create new user function
const createUser = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const userExist = await getUserByEmail(email);

    if (userExist) {
      return res
        .status(403)
        .json({ error: "email is already taken by another user" });
    }

    // hash user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "user creation failed" });
    }

    return res
      .status(201)
      .json({ message: "user created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await getCurrentUser(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json({ message: "user found success", user });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getMe = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await getCurrentUser(id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = { createUser, getUserById, getMe };
