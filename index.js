const express = require('express');

const app = express();
const userRoutes = require('./routes/userRoutes'); // Import user routes



// Middleware to parse JSON bodies
app.use(express.json());


// Use user routes for handling user-related endpoints
app.use('/api/user', userRoutes); // Add the user routes under "/api/user" path

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
