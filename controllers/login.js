const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Login Endpoint
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate a token (You can replace "secretkey" with an environment variable)
    const token = jwt.sign({ id: user._id, email: user.email }, "secretkey", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { loginUser };
