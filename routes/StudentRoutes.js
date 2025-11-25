const express = require("express");
const router = express.Router();
//const User = require("../models/User");

const Student = require('../models/Student'); // Import the Student Model

// @route   POST /api/students
// @desc    Create a new student record
// @access  Public (Will be Private later with auth)
router.post('/', async (req, res) => {
    // Destructure the required fields from the request body
    const { studentId, name, email, course } = req.body; 

    // **Input Validation**
    if (!studentId || !name || !email || !course) {
        return res.status(400).json({ msg: 'Please provide Student ID, Name, Email, and Course.' });
    }

    try {
        // **Check for Duplicates (ID or Email)**
        let student = await Student.findOne({ $or: [{ studentId }, { email }] });
        if (student) {
            return res.status(400).json({ msg: 'A student with this ID or Email already exists.' });
        }

        // **Create New Student Instance**
        const newStudent = new Student({
            studentId,
            name,
            email,
            course
        });

        // **Save to Database**
        await newStudent.save();
        
        // **Success Response** (201 Created)
        res.status(201).json(newStudent);
        
    } catch (err) {
        console.error(err.message);
        // Log the error and send a generic server error response
        res.status(500).send('Server Error: Failed to create student.');
    }
});

module.exports = router;