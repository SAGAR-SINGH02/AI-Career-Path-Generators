const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // Initialize Express application

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/careerAI', { // Connect to MongoDB

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err); // Log connection error
    process.exit(1); // Exit process if connection fails
});


// Use user routes
app.use('/api/users', userRoutes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
