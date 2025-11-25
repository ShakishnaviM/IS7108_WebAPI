const express = require("express");
const router = express.Router();
 HEAD
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
const Student = require("../models/Student");

// GET all students
router.get("/students", async (req, res) => {
    try {
      const students = await Student.find().sort({ _id: -1 });
      return res.status(200).json({
        success: true,
        count: students.length,
        data: students,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while fetching students",
      });
    }
  });

// UPDATE student
router.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });

  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating student",
    });
  }
});

  module.exports = router;
//>>>>>>> 375ab666fae79573ff4b0c20046f76ea348a21fb
