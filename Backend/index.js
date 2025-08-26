// backend/index.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'; 
import cron from 'node-cron'; 

import Student from './models/student.model.js'; 

// Import statements ko sahi kiya gaya hai
import studentsRouter from './routes/students.js';
import skipRequestsRouter from './routes/skipRequests.js';
import authRouter from './routes/auth.js'; 
import menuRouter from './routes/menu.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("✅ MongoDB database connection established successfully");
});

app.use('/students', studentsRouter); 
app.use('/skip-requests', skipRequestsRouter);
app.use('/api/auth', authRouter); 
app.use('/menu', menuRouter);

// KITCHEN TEAM ROTATION CRON JOB (Final 24-Hour Schedule)
// Ab yeh task har din subah 6 AM par run hoga
cron.schedule('*/2 * * * *', async () => {
    console.log('⏰ Running daily kitchen team rotation...');
    try {
        const activeStudents = await Student.find({ status: 'active' }).sort({ turnOrder: 1 });
        
        if (activeStudents.length >= 5) {
            const firstFive = activeStudents.slice(0, 5);
            const remaining = activeStudents.slice(5);
            const rotatedStudents = [...remaining, ...firstFive];
            
            for (let i = 0; i < rotatedStudents.length; i++) {
                await Student.findByIdAndUpdate(rotatedStudents[i]._id, { turnOrder: i });
            }
            console.log('✅ Rotation successful. Students turnOrder updated.');
        } else {
            console.log('❌ Not enough active students for a full rotation.');
        }
    } catch (error) {
        console.error("🚫 Error during rotation cron job:", error);
    }
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});