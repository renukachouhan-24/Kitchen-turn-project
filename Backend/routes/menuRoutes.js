// Backend/routes/menuRoutes.js

import express from "express";
const router = express.Router();

// Temporary data
const todayMenu = [
  { name: 'Aloo Paratha', nutrients: 'Carbs, Protein, Fiber' },
  { name: 'Dal Makhani', nutrients: 'Protein, Iron, Fiber' },
  { name: 'Jeera Rice', nutrients: 'Carbs' },
  { name: 'Mixed Veg Curry', nutrients: 'Vitamins, Minerals' },
];

router.get('/today', (req, res) => {
  res.json(todayMenu);
});

// Use export default for ES Modules
export default router;