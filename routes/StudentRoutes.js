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

// ------------------------------------------------------------------
// 1. POST /api/students - CREATE 
// ------------------------------------------------------------------

router.post('/', async (req, res) => {
    // Destructure ALL new fields from the request body
    const { fullname, email, age, studentId, course, year, address } = req.body; 

    // **Input Validation** (Checking only required fields: fullname and email)
    if (!fullname || !email) {
        return res.status(400).json({ msg: 'Please provide full name and email, as these are required fields.' });
    }

    try {
        // **Check for Duplicates (Email)**
        let student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({ msg: 'A student with this email already exists.' });
        }

        // **Create New Student Instance**
        const newStudent = new Student({
            fullname,
            email,
            age,
            studentId,
            course,
            year,
            address
        });

        // **Save to Database**
        await newStudent.save();
        
        // **Success Response** (201 Created)
        res.status(201).json({ 
            success: true, 
            message: "Student created successfully", 
            data: newStudent 
        });
        
    } catch (err) {
        console.error(err.message);
        // Log the error and send a generic server error response
        res.status(500).send('Server Error: Failed to create student.');
    }
});



router.get('/', async (req, res) => {
    try {
        // Fetch all students, sorted by creation date (newest first)
        const students = await Student.find().sort({ createdAt: -1 }); 
        
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


router.put('/:id', async (req, res) => {
    try {
        // Find the student by ID from the URL parameters (req.params.id) and update it
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // {new: true} returns the updated document
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
        // This catches validation errors (e.g., trying to use a duplicate email)
        res.status(500).json({ 
            success: false, 
            message: "Error updating student" 
        }); 
    }
});

// ------------------------------------------------------------------
// Export the router
// ------------------------------------------------------------------


//------------------------------------------------------
  // DELETE student by ID

router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: deletedStudent,
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting student",
        });
    }
});

  module.exports = router;
