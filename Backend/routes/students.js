// backend/routes/students.js
import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

// Route 1: Saare students ki list bhejta hai (UI grid ke liye)
router.route('/all').get((req, res) => {
    // No sorting needed here, MongoDB sorts by _id by default
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 2: Sirf active students ki list bhejta hai (teams ke liye)
router.route('/active').get((req, res) => {
    // Sirf active students ko fetch karo aur default order (_id) mein rakho
    Student.find({ status: 'active' })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 3: Student ka status update karega
router.route('/update-status/:id').post(async (req, res) => {
    try {
        const { status } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { status });
        res.json('Student status updated successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route 4: Sabhi students ka status reset karega (reset button ke liye)
router.route('/reset').post(async (req, res) => {
    try {
        await Student.updateMany({}, { status: 'active' });
        res.json('All student statuses reset to active.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route 5: Naya student add karega (yeh existing route hai)
router.route('/add').post(async (req, res) => {
    try {
        const { name, email, password, joiningDate } = req.body;
        const newStudent = new Student({
            name,
            email,
            password,
            joiningDate,
            status: 'active'
        });
        await newStudent.save();
        res.status(201).json('Student added successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

export default router;