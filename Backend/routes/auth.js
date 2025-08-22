// backend/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcryptjs'; // Password hash karne ke liye
import Student from '../models/student.model.js';

const router = Router();

// Route: Naya student register karne ke liye
// URL hoga: POST http://localhost:5000/api/auth/register
router.route('/register').post(async (req, res) => {
  const { name, email, password, joiningDate } = req.body;

  try {
    // 1. Check karein ki user pehle se to nahi hai
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student with this email already exists' });
    }

    // 2. Naya student object banayein
    student = new Student({
      name,
      email,
      password,
      joiningDate,
    });

    // 3. Password ko Hash (Encrypt) karein
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);

    // 4. Student ko database mein save karein
    await student.save();
    
    res.status(201).json({ msg: 'Student registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;