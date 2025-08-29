// // backend/index.js

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import 'dotenv/config'; 
// import cron from 'node-cron'; // cron import karein

// // Import statements
// import studentsRouter from './routes/students.js';
// import skipRequestsRouter from './routes/skipRequests.js';
// import authRouter from './routes/auth.js'; 
// import menuRouter from './routes/menu.js';

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("✅ MongoDB database connection established successfully");
// });

// app.use('/students', studentsRouter); 
// app.use('/skip-requests', skipRequestsRouter);
// app.use('/api/auth', authRouter); 
// app.use('/menu', menuRouter);

// // ⏰ Naya CRON JOB jo har 1 minute baad chalega
// // Ismein hum 'advance-day' route ko call karenge
// cron.schedule('0 6 * * * *', async () => {
//     console.log('⏰ Running 1-minute kitchen team rotation...');
//     try {
//         const response = await fetch('http://localhost:5000/students/advance-day', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         const result = await response.json();
//         console.log(`✅ Rotation successful: ${result}`);
//     } catch (error) {
//         console.error("🚫 Error during 1-minute rotation:", error);
//     }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server started on http://localhost:${port}`);
// });

// backend/index.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'; 
import cron from 'node-cron'; 

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

// ⏰ Naya CRON JOB jo ab har din subah 6 AM par chalega
// '0 6 * * *' ka matlab hai:
// 0: Minute (0)
// 6: Hour (6 AM)
// *: Day of month (Har din)
// *: Month (Har mahine)
// *: Day of week (Hafte ke har din)
cron.schedule('0 6 * * *', async () => {
    console.log('⏰ Running daily kitchen team rotation...');
    try {
        const response = await fetch('http://localhost:5000/students/advance-day', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        console.log(`✅ Rotation successful: ${result}`);
    } catch (error) {
        console.error("🚫 Error during daily rotation:", error);
    }
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});