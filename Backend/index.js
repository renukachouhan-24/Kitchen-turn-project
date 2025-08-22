// backend/index.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'; 

// Routes ko import karein
import studentsRouter from './routes/students.js';
import skipRequestsRouter from './routes/skipRequests.js';
import authRouter from './routes/auth.js'; 

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("✅ MongoDB database connection established successfully");
});
// -------------------------

// --- API ROUTES ---
app.use('/students', studentsRouter); 
app.use('/skip-requests', skipRequestsRouter);
app.use('/api/auth', authRouter); 
// Students ke saare routes yahan se handle honge
// (Yahan baaki ke routes, jaise skip requests, bhi aayenge)
// ------------------

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});






