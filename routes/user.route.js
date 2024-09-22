const express = require('express');
const User = require('../models/user.model.js')
const { registerUser, loginUser, logoutUser, isAdmin } = require('../controllers/user.controller.js');
const router = express.Router();


router.post('/register', registerUser);
router.post('/register/admin', registerUser); // Endpoint untuk register admin
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;

