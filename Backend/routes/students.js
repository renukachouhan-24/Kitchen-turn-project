// // backend/routes/students.js

// import { Router } from 'express';
// import Student from '../models/student.model.js';

// const router = Router();

// // Route 1: Saare students ki list bhejta hai (UI grid ke liye)
// router.route('/all').get((req, res) => {
//     // Ab 'turnOrder' field ke hisaab se sort karein
//     Student.find().sort({ turnOrder: 1 })
//         .then(students => res.json(students))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // Route 2: Sirf active students ki list bhejta hai (teams ke liye)
// router.route('/active').get((req, res) => {
//     // Sirf active students ko 'turnOrder' ke hisaab se sort karke bhejenge
//     Student.find({ status: 'active' }).sort({ turnOrder: 1 })
//         .then(students => res.json(students))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // Route 3: Student ka status update karega
// router.route('/update-status/:id').patch(async (req, res) => {
//     try {
//         const { status } = req.body;
//         await Student.findByIdAndUpdate(req.params.id, { status });
//         res.json('Student status updated successfully!');
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// // Route 4: Sabhi students ka status reset karega
// router.route('/reset').post(async (req, res) => {
//     try {
//         await Student.updateMany({}, { status: 'active' });
//         // Reset karte waqt turnOrder ko bhi reset karein
//         const allStudents = await Student.find({}).sort({ createdAt: 1 });
//         for(let i=0; i < allStudents.length; i++){
//             await Student.findByIdAndUpdate(allStudents[i]._id, { turnOrder: i });
//         }
//         res.json('All student statuses and turn order reset.');
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// // Route 5: Naya student add karega
// router.route('/add').post(async (req, res) => {
//     try {
//         const { name, email, password, joiningDate } = req.body;
//         // Naye student ka turnOrder set karein, baaki students ki ginti ke hisaab se
//         const count = await Student.countDocuments();
//         const newStudent = new Student({
//             name,
//             email,
//             password,
//             joiningDate,
//             status: 'active',
//             turnOrder: count
//         });
//         await newStudent.save();
//         res.status(201).json('Student added successfully!');
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// export default router;



import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

// Route 1: Saare students ki list bhejta hai (UI grid ke liye)
router.route('/all').get((req, res) => {
    // turnOrder ke hisaab se sort karna chahiye
    Student.find().sort({ turnOrder: 1 })
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 2: Sirf active students ki list bhejta hai (teams ke liye)
router.route('/active').get((req, res) => {
    // turnOrder ke hisaab se sort karna chahiye
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

// Route 4: Sabhi students ka status reset karega
router.route('/reset').post(async (req, res) => {
    try {
        await Student.updateMany({}, { status: 'active' });
        // turnOrder ko bhi reset karein
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
        
        // ** Yahan naya logic add kiya gaya hai **
        // Database mein students ki ginti karein taaki naye student ko aakhri number mil sake
        const count = await Student.countDocuments();
        
        const newStudent = new Student({
            name,
            email,
            password,
            joiningDate,
            status: 'active',
            // turnOrder ko ginti ke hisaab se set karein
            turnOrder: count 
        });
        
        await newStudent.save();
        res.status(201).json('Student added successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

export default router;