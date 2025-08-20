// backend/routes/students.js

import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

// Yeh route saare students ko fetch karega
router.route('/').get((req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Yeh route naya student add karega
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const joiningDate = Date.parse(req.body.joiningDate);
  const totalTurns = Number(req.body.totalTurns);

  const newStudent = new Student({name, joiningDate, totalTurns});

  newStudent.save()
    .then(() => res.json('Student added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Yeh aakhri line sabse zaroori hai
export default router; // <-- Yahan 'export default' hona chahiye, 'module.exports' nahi