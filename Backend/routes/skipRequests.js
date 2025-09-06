import { Router } from 'express';
import SkipRequest from '../models/skipRequest.model.js';
import Student from '../models/student.model.js';

const router = Router();

// ✅ Coordinator verification middleware
const verifyCoordinator = (req, res, next) => {
    const userRole = req.headers.userrole; // frontend se headers me bhejna
    if (!userRole || userRole !== 'coordinator') {
        return res.status(403).json({ message: 'Access denied. Only coordinators can perform this action.' });
    }
    next();
};

// Route 1: Nayi skip request submit karne ke liye
router.route('/add').post((req, res) => {
    const { studentName, reason } = req.body;
    const newSkipRequest = new SkipRequest({ studentName, reason });
    newSkipRequest.save()
        .then(() => res.json('Skip request submitted successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 2: Saari skip requests (Coordinator view)
router.route('/').get((req, res) => {
    SkipRequest.find()
        .then(requests => res.json(requests))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route 3: Approve request (Coordinator only)
router.route('/approve/:id').patch(verifyCoordinator, async (req, res) => {
    try {
        const { id } = req.params;
        const { studentName } = req.body;

        const updatedRequest = await SkipRequest.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
        if (!updatedRequest) return res.status(404).json('Request not found!');

        await Student.findOneAndUpdate({ name: studentName }, { $inc: { approvedRequestCount: 1 } });
        await Student.findOneAndUpdate({ name: studentName }, { status: 'on_leave' });

        res.json('Request approved and student status updated successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route 4: Reject request (Coordinator only)
router.route('/reject/:id').patch(verifyCoordinator, async (req, res) => {
    try {
        const { id } = req.params;
        await SkipRequest.findByIdAndUpdate(id, { status: 'Rejected' });
        res.json('Request rejected successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route 5: Stats
router.route('/stats').get(async (req, res) => {
    try {
        const students = await Student.find({}, 'name approvedRequestCount');
        const studentStats = students.map(student => ({
            studentName: student.name,
            skipCount: student.approvedRequestCount
        }));
        res.json(studentStats);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
