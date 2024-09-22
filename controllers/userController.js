const User = require('../models/User');
const bcrypt = require('bcryptjs');// npm install express bcryptjs jsonwebtoken
const jwt = require('jsonwebtoken'); 

// Untuk ngecek admin pake middleware 

const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }
      
      const user = User.find(user => user.id === decoded.id);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Require Admin Role!' });
      }
  
      next();
    });
  };
  

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
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out' });
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secretkey', {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  isAdmin, 
};
