import express from 'express';
import Rating from '../models/rating.model.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { teamMembers, starValue } = req.body;
    
    if (!teamMembers || starValue === undefined) {
        return res.status(400).json({ message: 'Team members and star value are required.' });
    }

    try {
        let teamRating = await Rating.findOne({ teamMembers: { $all: teamMembers } });

        if (!teamRating) {
            teamRating = new Rating({ teamMembers: teamMembers });
        }

        teamRating.totalStars += starValue;
        teamRating.voteCount += 1; // हर बार रेटिंग सबमिट होने पर वोट काउंट बढ़ाएं
        await teamRating.save();

        res.json('Rating added successfully!');
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err });
    }
});

router.get('/top-teams', async (req, res) => {
    try {
        const topTeams = await Rating.find().sort({ totalStars: -1 }).limit(5);
        res.json(topTeams);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err });
    }
});

router.post('/reset', async (req, res) => {
    try {
        await Rating.deleteMany({});
        res.json('All ratings have been reset.');
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err });
    }
});

export default router;