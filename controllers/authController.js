const User = require("../models/User");

// SIGN UP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Sanitize the response - never return the password
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error during sign up", error: error.message });
  }
};

// SIGN IN
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Sanitize the response - never return the password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error during sign in", error: error.message });
  }
};
