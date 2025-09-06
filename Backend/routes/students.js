import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

// Route 1: Saare students ki list bhejta hai (UI grid ke liye)
router.route('/all').get((req, res) => {
    Student.find().sort({ turnOrder: 1 })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 2: Sirf active students ki list bhejta hai (teams ke liye)
// Route 2: Sirf active students ki list bhejta hai (teams ke liye)
router.route('/active').get((req, res) => {
    Student.find({ status: 'active', role: { $ne: 'coordinator' } }) // 👈 exclude coordinator
        .sort({ turnOrder: 1 })
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

// Route 4: Sabhi students ka status reset karega
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

// ✅ Route 6: Role update karega (only one coordinator allowed at a time)
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

        // ✅ Agar role student ho gaya to forceLogout flag bhej do
        res.json({
            message: 'Student role updated successfully!',
            student: updatedStudent,
            forceLogout: role === "student",
            userId: req.params.id   // 👈 ye flag frontend ko milega
        });
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

export default router;
