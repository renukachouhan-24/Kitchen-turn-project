// backend/routes/students.js

import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

// Route 1: Sabhi students ki list bhejta hai
router.route('/all').get((req, res) => {
    Student.find().sort({ turnOrder: 1 })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 2: Sirf active students ki list bhejta hai (teams ke liye)
router.route('/active').get((req, res) => {
    Student.find({ status: 'active' }).sort({ turnOrder: 1 })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 3: Student ka status update karega
router.route('/update-status/:id').patch(async (req, res) => {
    try {
        const { status } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { status });
        res.json('Student status updated successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route 4: Sabhi students ka status aur turnOrder reset karega
router.route('/reset').post(async (req, res) => {
    try {
        await Student.updateMany({}, { status: 'active' });
        const allStudents = await Student.find({}).sort({ createdAt: 1 });
        for(let i=0; i < allStudents.length; i++){
            await Student.findByIdAndUpdate(allStudents[i]._id, { turnOrder: i });
        }
        res.json('All student statuses and turn order reset.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route 5: Naya student add karega
router.route('/add').post(async (req, res) => {
    try {
        const { name, email, password, joiningDate } = req.body;
        const count = await Student.countDocuments();
        
        const newStudent = new Student({
            name,
            email,
            password,
            joiningDate,
            status: 'active',
            turnOrder: count 
        });
        
        await newStudent.save();
        res.status(201).json('Student added successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// ⚡ Naya Endpoint: Kitchen Team ko aage badhata hai
router.route('/advance-day').post(async (req, res) => {
    try {
        const activeStudents = await Student.find({ status: 'active' }).sort({ turnOrder: 1 });
        
        if (activeStudents.length >= 5) {
            // Pehle 5 students ko nikaal kar aakhri mein daal dein
            const firstFive = activeStudents.slice(0, 5);
            const remaining = activeStudents.slice(5);
            const rotatedStudents = [...remaining, ...firstFive];
            
            // Ab naye turnOrder ko database mein update karein
            for (let i = 0; i < rotatedStudents.length; i++) {
                await Student.findByIdAndUpdate(rotatedStudents[i]._id, { turnOrder: i });
            }
            res.json('Kitchen team advanced to next day.');
        } else {
            res.status(400).json('Not enough active students for a full rotation.');
        }
    } catch (error) {
        res.status(500).json('Error during rotation: ' + error);
    }
});

export default router;