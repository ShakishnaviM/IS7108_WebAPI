require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Include cors middleware

const app = express();


app.use(express.json());
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


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Routes-student
const studentRoutes = require("./routes/StudentRoutes");
app.use("/api/students", studentRoutes);




// **Basic Server Test Route (Optional but helpful)**
app.get("/", (req, res) => {
    res.send("API is running and ready for requests...");
});

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});