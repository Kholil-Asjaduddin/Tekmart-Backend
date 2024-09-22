const express = require('express');
const { registerUser, loginUser, logoutUser, isAdmin } = require('../controllers/userController');
const router = express.Router();


router.post('/register', registerUser);
router.post('/register/admin', registerUser); // Endpoint untuk register admin
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;

