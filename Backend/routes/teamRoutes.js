// Backend/routes/teamRoutes.js

import express from "express";
const router = express.Router();

// Temporary data
const kitchenTeam = ['Rohan Sharma', 'Priya Singh', 'Amit Kumar'];

router.get('/today', (req, res) => {
  res.json(kitchenTeam);
});

// Use export default for ES Modules
export default router;