const express = require('express');
const connectDB = require('./configs/database');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import rute order


const app = express();

// Menghubungkan ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());


// Use user routes for handling user-related endpoints
app.use('/api/users', userRoutes); // Add the user routes under "/api/user" path
// Menggunakan route product
app.use('/api/products', productRoutes);
app.use('/api', orderRoutes); 

// Semua rute akan diawali dengan /api
// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});