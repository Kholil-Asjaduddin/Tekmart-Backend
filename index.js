const express = require('express');
const connectDB = require('./configs/database');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Menghubungkan ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());


// Use user routes for handling user-related endpoints
app.use('/api/users', userRoutes); // Add the user routes under "/api/user" path

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});