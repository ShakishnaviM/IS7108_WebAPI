// Load environment variables first
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Include cors middleware

const app = express();

// **Middleware**
// 1. Process incoming JSON data (Crucial for POST/PUT requests)
app.use(express.json());
// 2. Enable Cross-Origin Resource Sharing
app.use(cors());


// **Database Connection**
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB();


// -------------------------------------------------------------
// **ROUTES**
// -------------------------------------------------------------


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Routes-student (Your and other student CRUD tasks)
// NOTE: Ensure the file is named 'studentRoutes.js' (lowercase s)

// The variable name is changed to StudentRoutes to potentially resolve the TypeScript/IDE casing conflict.
const StudentRoutes = require("./routes/studentRoutes"); 
app.use("/api/students", StudentRoutes); 


// **Basic Server Test Route (Optional but helpful)**
app.get("/", (req, res) => {
    res.send("API is running and ready for requests...");
});


// **Start the Server Listener**
// Use PORT from .env, defaulting to 5000 if not found
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});