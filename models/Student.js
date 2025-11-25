const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false },
    studentId: { type: String, required: false },
    course: { type: String, required: false },
    year: { type: Number, required: false },
    address: { type: String, required: false }
});

module.exports = mongoose.model("Student", studentSchema);
