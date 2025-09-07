import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

router.route('/all').get((req, res) => {
    Student.find().sort({ turnOrder: 1 })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/active').get((req, res) => {
    Student.find({ status: 'active', role: { $ne: 'coordinator' } }) 
        .sort({ turnOrder: 1 })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update-status/:id').patch(async (req, res) => {
    try {
        const { status } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { status });
        res.json('Student status updated successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/reset').post(async (req, res) => {
    try {
        await Student.updateMany({}, { status: 'active' });
        const allStudents = await Student.find({}).sort({ createdAt: 1 });
        for (let i = 0; i < allStudents.length; i++) {
            await Student.findByIdAndUpdate(allStudents[i]._id, { turnOrder: i });
        }
        res.json('All student statuses and turn order reset.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

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

router.route('/update-role/:id').patch(async (req, res) => {
    try {
        const { role } = req.body;

        if (!role || (role !== 'student' && role !== 'coordinator')) {
            return res.status(400).json('Invalid role provided.');
        }

        if (role === 'coordinator') {
            await Student.updateMany(
                { role: 'coordinator' },
                { $set: { role: 'student' } }
            );
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        res.json({
            message: 'Student role updated successfully!',
            student: updatedStudent,
            forceLogout: role === "student",
            userId: req.params.id   
        });
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

export default router;
