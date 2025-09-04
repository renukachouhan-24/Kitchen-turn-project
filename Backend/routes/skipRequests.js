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