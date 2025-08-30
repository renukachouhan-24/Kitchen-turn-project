// backend/index.js (Updated with Correct Rotation Logic)

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
// Deprecated options hata diye gaye hain, naye Mongoose version ko inki zaroorat nahi
mongoose.connect(uri); 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("✅ MongoDB database connection established successfully");
});

app.use('/students', studentsRouter); 
app.use('/skip-requests', skipRequestsRouter);
app.use('/api/auth', authRouter); 
app.use('/menu', menuRouter);

// KITCHEN TEAM ROTATION CRON JOB (CORRECTED LOGIC)
// Testing ke liye har minute chalega ('*/1 * * * *')
// KITCHEN TEAM ROTATION CRON JOB (FINAL & SIMPLER LOGIC)


// KITCHEN TEAM ROTATION CRON JOB (FINAL & SIMPLER LOGIC)
// KITCHEN TEAM ROTATION CRON JOB (FINAL TEAM-BASED LOGIC)
cron.schedule('*/1 * * * *', async () => {
  console.log('⏰ Running daily kitchen team rotation...');
  try {
      const activeStudents = await Student.find({ status: 'active' }).sort({ turnOrder: 1 });
      
      const teamSize = 5;
      if (activeStudents.length >= teamSize) {
          
          // Step 1: Purani team aur baaki students ko alag karein
          const onDutyTeam = activeStudents.slice(0, teamSize);
          const offDutyStudents = activeStudents.slice(teamSize);

          // Step 2: Naya order banayein (purani team aakhir mein)
          const newOrder = [...offDutyStudents, ...onDutyTeam];
          
          // Step 3: Safe tareeke se naya order database mein update karein
          // Pehle sabko temporary "safe" zone mein bhejenge
          const tempUpdatePromises = newOrder.map((student, index) => 
              Student.findByIdAndUpdate(student._id, { turnOrder: index + 1000 })
          );
          await Promise.all(tempUpdatePromises);

          // Phir sabko unka final naya turnOrder denge (0, 1, 2...)
          const finalUpdatePromises = newOrder.map((student, index) => 
              Student.findByIdAndUpdate(student._id, { turnOrder: index })
          );
          await Promise.all(finalUpdatePromises);
          
          console.log(`✅ Team Rotation Successful. ${teamSize} students moved to the end of the line.`);

      } else {
          console.log(`❌ Not enough active students for a team rotation of ${teamSize}.`);
      }
  } catch (error) {
      console.error("🚫 Error during team rotation cron job:", error);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});








