// import { Router } from 'express';
// import SkipRequest from '../models/skipRequest.model.js';
// import Student from '../models/student.model.js'; // Student model import karein

// const router = Router();

// // Route 1: Nayi skip request submit karne ke liye
// router.route('/add').post((req, res) => {
//   const { studentName, reason, startDate, numberOfDays } = req.body;

//   const newSkipRequest = new SkipRequest({
//     studentName,
//     reason,
//     startDate: Date.parse(startDate),
//     numberOfDays: Number(numberOfDays),
//   });

//   newSkipRequest.save()
//     .then(() => res.json('Skip request submitted successfully!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // Route 2: Saari skip requests ki list dekhne ke liye (Coordinator ke liye)
// router.route('/').get((req, res) => {
//   SkipRequest.find()
//     .then(requests => res.json(requests))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // Route 3: Request approve karne ke liye
// // Is route mein request ka ID aur student ka naam aayega
// router.route('/approve/:id').patch(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { studentName } = req.body;

//     // Skip request ka status 'Approved' karein
//     const updatedRequest = await SkipRequest.findByIdAndUpdate(
//       id,
//       { status: 'Approved' },
//       { new: true }
//     );
//     if (!updatedRequest) {
//       return res.status(404).json('Request not found!');
//     }

//     // Student ka status 'on_leave' karein (ya koi aur custom status)
//     // Ab hum student ko naam se dhoondhenge aur uska status update karenge
//     await Student.findOneAndUpdate(
//       { name: studentName },
//       { status: 'on_leave' }
//     );

//     res.json('Request approved and student status updated successfully!');
//   } catch (err) {
//     res.status(400).json('Error: ' + err);
//   }
// });

// // Route 4: Request reject karne ke liye
// router.route('/reject/:id').patch(async (req, res) => {
//     try {
//         const { id } = req.params;
//         await SkipRequest.findByIdAndUpdate(id, { status: 'Rejected' });
//         res.json('Request rejected successfully!');
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// export default router;

// import { Router } from 'express';
// import SkipRequest from '../models/skipRequest.model.js';
// import Student from '../models/student.model.js';

// const router = Router();

// // Route 1: Nayi skip request submit karne ke liye
// router.route('/add').post((req, res) => {
//   const { studentName, reason, startDate, numberOfDays } = req.body;

//   const newSkipRequest = new SkipRequest({
//     studentName,
//     reason,
//   });

//   newSkipRequest.save()
//     .then(() => res.json('Skip request submitted successfully!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // Route 2: Saari skip requests ki list dekhne ke liye (Coordinator ke liye)
// router.route('/').get((req, res) => {
//   SkipRequest.find()
//     .then(requests => res.json(requests))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // Route 3: Request approve karne ke liye
// // Is route mein request ka ID aur student ka naam aayega
// router.route('/approve/:id').patch(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { studentName } = req.body;

//     // Skip request ka status 'Approved' karein
//     const updatedRequest = await SkipRequest.findByIdAndUpdate(
//       id,
//       { status: 'Approved' },
//       { new: true }
//     );
//     if (!updatedRequest) {
//       return res.status(404).json('Request not found!');
//     }

//     // Student ka status 'on_leave' karein (ya koi aur custom status)
//     // Ab hum student ko naam se dhoondhenge aur uska status update karenge
//     await Student.findOneAndUpdate(
//       { name: studentName },
//       { status: 'on_leave' }
//     );

//     res.json('Request approved and student status updated successfully!');
//   } catch (err) {
//     res.status(400).json('Error: ' + err);
//   }
// });

// // Route 4: Request reject karne ke liye
// router.route('/reject/:id').patch(async (req, res) => {
//     try {
//         const { id } = req.params;
//         await SkipRequest.findByIdAndUpdate(id, { status: 'Rejected' });
//         res.json('Request rejected successfully!');
//     } catch (err) {
//         res.status(400).json('Error: ' + err);
//     }
// });

// // === Naya Route: Approved requests ki ginti karne ke liye ===
// // Yeh route har student ke liye approved skip requests ka count deta hai
// router.route('/stats').get(async (req, res) => {
//     try {
//         const approvedRequests = await SkipRequest.find({ status: 'Approved' });

//         // Har student ki approved requests ko count karein
//         const studentStats = approvedRequests.reduce((acc, request) => {
//             const studentName = request.studentName;
//             // Agar student pehle se object mein hai, toh count badha dein
//             if (acc[studentName]) {
//                 acc[studentName].skipCount += 1;
//             } else {
//                 // Agar naya student hai, toh naya entry banayein
//                 acc[studentName] = {
//                     studentName: studentName,
//                     skipCount: 1,
//                 };
//             }
//             return acc;
//         }, {});

//         // Object ko array mein badal dein
//         const studentStatsArray = Object.values(studentStats);
//         res.json(studentStatsArray);
//     } catch (err) {
//         console.error("Error fetching stats:", err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// export default router;


// backend/routes/skipRequests.js

import { Router } from 'express';
import SkipRequest from '../models/skipRequest.model.js';
import Student from '../models/student.model.js';

const router = Router();

// Route 1: Nayi skip request submit karne ke liye
router.route('/add').post((req, res) => {
  const { studentName, reason, startDate, numberOfDays } = req.body;

  const newSkipRequest = new SkipRequest({
    studentName,
    reason,
  });

  newSkipRequest.save()
    .then(() => res.json('Skip request submitted successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route 2: Saari skip requests ki list dekhne ke liye (Coordinator ke liye)
router.route('/').get((req, res) => {
  SkipRequest.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route 3: Request approve karne ke liye (Ab approved count bhi update hoga)
router.route('/approve/:id').patch(async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName } = req.body;

    // Skip request ka status 'Approved' karein
    const updatedRequest = await SkipRequest.findByIdAndUpdate(
      id,
      { status: 'Approved' },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json('Request not found!');
    }

    // === NAYA CODE ===
    // Student ka approvedRequestCount badhaein
    await Student.findOneAndUpdate(
      { name: studentName },
      { $inc: { approvedRequestCount: 1 } }
    );
    // =================

    // Student ka status 'on_leave' karein (ya koi aur custom status)
    await Student.findOneAndUpdate(
      { name: studentName },
      { status: 'on_leave' }
    );

    res.json('Request approved and student status updated successfully!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Route 4: Request reject karne ke liye
router.route('/reject/:id').patch(async (req, res) => {
    try {
        const { id } = req.params;
        await SkipRequest.findByIdAndUpdate(id, { status: 'Rejected' });
        res.json('Request rejected successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// === UPDATED Route: Approved requests ki ginti karne ke liye ===
// Ab yeh route सीधे Student model se data lega
router.route('/stats').get(async (req, res) => {
    try {
        const students = await Student.find({}, 'name approvedRequestCount');
        
        // Output format ko CoordinatorRequestPanel.js ke hisab se badlein
        const studentStats = students.map(student => ({
            studentName: student.name,
            skipCount: student.approvedRequestCount
        }));
        
        res.json(studentStats);
    } catch (err) {
        console.error("Error fetching stats:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;