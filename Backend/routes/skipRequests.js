// backend/routes/skipRequests.js

import { Router } from 'express';
import SkipRequest from '../models/skipRequest.model.js'; // Naya model import karein

const router = Router();

// Route 1: Nayi skip request submit karne ke liye
// URL hoga: http://localhost:5000/skip-requests/add
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
// URL hoga: http://localhost:5000/skip-requests/
router.route('/').get((req, res) => {
  SkipRequest.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;






 