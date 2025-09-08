import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';

const router = Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.post('/register', async (req, res) => {
  const { name, email, password, joiningDate } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student with this email already exists' });
    }

    const count = await Student.countDocuments();

    student = new Student({
      name,
      email,
      password,
      joiningDate,
      status: 'active',
      turnOrder: count,
      role: "student"
    });

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    await student.save();

    res.status(201).json({ msg: 'Student registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error: Could not register student.');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: student._id, name: student.name, role: student.role };

    jwt.sign(
      { user: payload },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ message: "User not found" });
    res.json({
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      status: student.status
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
