const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Model pengguna

// Untuk ngecek admin pake middleware 
exports.isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      const user = await User.find({ id: decoded.id }); // Gunakan async/await di sini
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      if (this.isAdmin == false) {
        return res.status(403).json({ message: 'Require Admin Role!' });
      }
  
      next();
    } catch (err) {
      console.error('Error during token verification or user lookup:', err); // Tambahkan log kesalahan
      res.status(500).json({ message: 'Failed to authenticate token', error: err });
    }
  };
  