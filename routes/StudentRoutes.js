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
  
  module.exports = router;
