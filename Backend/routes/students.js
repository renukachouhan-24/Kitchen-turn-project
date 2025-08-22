// backend/routes/students.js

import { Router } from 'express';
import Student from '../models/student.model.js';

const router = Router();

// Yeh route saare students ki list bhejta hai (GET Request)
router.route('/').get((req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

// === YEH NAYA CODE ADD HUA HAI ===
// Yeh route naya student add karega (POST Request)
// URL hoga: http://localhost:5000/students/add
router.route('/add').post((req, res) => {
  // Frontend se bheja hua data req.body mein aata hai
  const name = req.body.name;
  const joiningDate = Date.parse(req.body.joiningDate);

  // Us data se ek naya student banate hain
  const newStudent = new Student({
    name,
    joiningDate,
  });

  // Naye student ko database mein save karte hain
  newStudent.save()
    .then(() => res.json('Student added successfully!')) // Success ka message bhejte hain
    .catch(err => res.status(400).json('Error: ' + err)); // Error bhejte hain
});
// ===================================

export default router;