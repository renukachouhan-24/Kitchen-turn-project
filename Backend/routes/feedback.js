// backend/routes/feedback.js
import { Router } from 'express';
import Feedback from '../models/feedback.model.js';

const router = Router();

// Naya feedback save karne ke liye
router.route('/add').post((req, res) => {
    const { comment } = req.body;
    const newFeedback = new Feedback({ comment });
    newFeedback.save()
        .then(() => res.json('Feedback added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Saare feedbacks get karne ke liye
router.route('/').get((req, res) => {
    Feedback.find().sort({ createdAt: -1 }) // Naya feedback sabse upar
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;