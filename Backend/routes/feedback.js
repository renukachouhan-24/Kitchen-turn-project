import { Router } from 'express';
import Feedback from '../models/feedback.model.js';

const router = Router();

router.route('/add').post((req, res) => {
    const { comment } = req.body;
    const newFeedback = new Feedback({ comment });
    newFeedback.save()
        .then(() => res.json('Feedback added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Feedback.find().sort({ createdAt: -1 }) 
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;