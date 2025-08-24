// backend/routes/menu.js
import { Router } from 'express';
import Menu from '../models/menu.model.js';
import Student from '../models/student.model.js'; // To populate kitchenTeam details

const router = Router();

// Helper function to get start of today in UTC
const getStartOfTodayUTC = () => {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0); // <-- NAYA: Use UTC hours for consistency
    return d;
};

// Route 1: Get today's menu and kitchen team
router.route('/today').get(async (req, res) => {
    try {
        const todayUTC = getStartOfTodayUTC(); // <-- BADLAV: Use UTC helper
        let menu = await Menu.findOne({ date: todayUTC }).populate('kitchenTeam', 'name');

        if (!menu) {
            menu = new Menu({ date: todayUTC });
            await menu.save();
            menu = await Menu.findOne({ date: todayUTC }).populate('kitchenTeam', 'name');
        }
        res.json(menu);
    } catch (err) {
        console.error("Error fetching today's menu:", err);
        res.status(500).json('Error: ' + err.message);
    }
});

// Route 2: Add/Update menu item for a specific meal type (breakfast, lunch, etc.)
router.route('/update-meal/:mealType').patch(async (req, res) => {
    try {
        const { mealType } = req.params; // breakfast, lunch, snacks, dinner
        const { foodName, nutrients } = req.body;

        if (!['breakfast', 'lunch', 'snacks', 'dinner'].includes(mealType)) {
            return res.status(400).json('Invalid meal type.');
        }
        if (!foodName || !nutrients) {
            return res.status(400).json('Food name and nutrients are required.');
        }

        const todayUTC = getStartOfTodayUTC(); // <-- BADLAV: Use UTC helper
        let menu = await Menu.findOne({ date: todayUTC });

        if (!menu) {
            menu = new Menu({ date: todayUTC });
        }

        menu[mealType].push({ foodName, nutrients });
        await menu.save();
        res.json('Menu item updated successfully!');

    } catch (err) {
        console.error(`Error updating ${mealType} menu:`, err);
        res.status(500).json('Error: ' + err.message);
    }
});

// Route 3: Remove a menu item for a specific meal type
router.route('/remove-meal/:mealType/:itemId').patch(async (req, res) => {
    try {
        const { mealType, itemId } = req.params;
        if (!['breakfast', 'lunch', 'snacks', 'dinner'].includes(mealType)) {
            return res.status(400).json('Invalid meal type.');
        }

        const todayUTC = getStartOfTodayUTC(); // <-- BADLAV: Use UTC helper
        const menu = await Menu.findOne({ date: todayUTC });

        if (!menu) {
            return res.status(404).json('No menu found for today.');
        }

        menu[mealType] = menu[mealType].filter(item => item._id.toString() !== itemId);
        await menu.save();
        res.json('Menu item removed successfully!');

    } catch (err) {
        console.error(`Error removing ${mealType} item:`, err);
        res.status(500).json('Error: ' + err.message);
    }
});


// Route 4: Update today's kitchen team (replace existing team or add members)
router.route('/update-team').patch(async (req, res) => {
    try {
        const { teamMembers } = req.body; // Array of student _ids
        if (!Array.isArray(teamMembers)) {
            return res.status(400).json('teamMembers must be an array of student IDs.');
        }

        const todayUTC = getStartOfTodayUTC(); // <-- BADLAV: Use UTC helper
        let menu = await Menu.findOne({ date: todayUTC });

        if (!menu) {
            menu = new Menu({ date: todayUTC });
        }
        menu.kitchenTeam = teamMembers; // Completely replaces the team
        await menu.save();
        res.json('Kitchen team updated successfully!');

    } catch (err) {
        console.error("Error updating kitchen team:", err);
        res.status(500).json('Error: ' + err.message);
    }
});

export default router;