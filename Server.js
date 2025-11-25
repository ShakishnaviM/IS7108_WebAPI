

// server.js

// Load environment variables immediately
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000; // Use a fallback port

// **Middleware** - Necessary for processing JSON data from POST requests
app.use(express.json());

<<<<<<< HEAD
// **Database Connection Function**
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB();

// -------------------------------------------------------------
// **1. Define the Student Routes (We will create this file next)**
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes); // Sets up the base route for all student APIs
// -------------------------------------------------------------


// **2. Basic Server Test Route (Optional but helpful)**
app.get('/', (req, res) => {
    res.send('API is running...');
});


// **3. Start the Server Listener**
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
//run on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes-auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Routes-student
const studentRoutes = require("./routes/StudentRoutes");
app.use("/api", studentRoutes);




>>>>>>> 375ab666fae79573ff4b0c20046f76ea348a21fb
