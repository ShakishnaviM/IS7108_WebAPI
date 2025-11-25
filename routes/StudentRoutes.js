const express = require("express");
const router = express.Router();
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
