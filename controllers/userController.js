const User = require('../models/User');
const Blacklist = require('../models/Blacklist');
const bcrypt = require('bcryptjs');// npm install express bcryptjs jsonwebtoken
const jwt = require('jsonwebtoken'); 

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body; // Perlu tambahin isAdmin di body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields (name, email, password)' });
  }

  try {
    const userExists = await User.findOne({ email }); // Use async/await here
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Default nya false 
    });
    await newUser
      .save()
      .then(() => {
        res.status(201).json({
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: generateToken(newUser),
        });
      })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
  
// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Gunakan findOne dan await

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: 'Email atau kata sandi tidak valid' });
    }
  } catch (error) {
    console.error('Error during login:', error); // Tambahkan log kesalahan
    res.status(500).json({ message: 'Kesalahan server', error });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers['authorization']; // Get the token from the authorization header
    if (!authHeader) return res.sendStatus(204); // No token provided, just return success

    const token = authHeader.split(' ')[1]; // Extract the token from the Bearer scheme
    const checkIfBlacklisted = await Blacklist.findOne({ token }); // Check if token is already blacklisted

    if (checkIfBlacklisted) {
      return res.sendStatus(204); // If already blacklisted, no need to blacklist again
    }

    // Add token to blacklist
    const newBlacklist = new Blacklist({ token });
    await newBlacklist.save();

    res.status(200).json({ message: 'User successfully logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secretkey', {
    expiresIn: '30d',
  });
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']; // Extract token from Authorization header
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Extract token from Bearer scheme

  // Check if token is blacklisted
  const blacklistedToken = await Blacklist.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: 'Token has been blacklisted. Please log in again.' });
  }

  // If not blacklisted, verify the token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' });
    req.user = decoded; // Attach the user info to the request object
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken
};
