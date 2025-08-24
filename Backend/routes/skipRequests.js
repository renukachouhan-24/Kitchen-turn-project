import { Router } from 'express';
import SkipRequest from '../models/skipRequest.model.js';
import Student from '../models/student.model.js'; // Student model import karein

const router = Router();

// Route 1: Nayi skip request submit karne ke liye
router.route('/add').post((req, res) => {
  const { studentName, reason, startDate, numberOfDays } = req.body;

  const newSkipRequest = new SkipRequest({
    studentName,
    reason,
    startDate: Date.parse(startDate),
    numberOfDays: Number(numberOfDays),
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

<<<<<<< HEAD
export default router;






 
=======
// Naya Route 3: Request approve karne ke liye
// Is route mein request ka ID aur student ka naam aayega
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

    // Student ka status 'on_leave' karein (ya koi aur custom status)
    // Ab hum student ko naam se dhoondhenge aur uska status update karenge
    await Student.findOneAndUpdate(
      { name: studentName },
      { status: 'on_leave' }
    );

    res.json('Request approved and student status updated successfully!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Naya Route 4: Request reject karne ke liye
router.route('/reject/:id').patch(async (req, res) => {
    try {
        const { id } = req.params;
        await SkipRequest.findByIdAndUpdate(id, { status: 'Rejected' });
        res.json('Request rejected successfully!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});


export default router;
>>>>>>> 26bf1ded7bd34be489d81a3d18840a6e31efd83b
