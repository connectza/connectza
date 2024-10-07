const User = require('../models/user'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: 'User already exists' });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ token });
};

// Add the login function similarly...
