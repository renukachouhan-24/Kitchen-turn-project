import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'; 
import cron from 'node-cron'; 
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

import Student from './models/student.model.js'; 
import Menu from './models/menu.model.js'; 
import Feedback from './models/feedback.model.js';
import Photo from './models/photo.model.js';
import SkipRequest from './models/skipRequest.model.js';

import studentsRouter from './routes/students.js';
import skipRequestsRouter from './routes/skipRequests.js';
import authRouter from './routes/auth.js'; 
import menuRouter from './routes/menu.js';
import feedbackRoutes from './routes/feedback.js';
import ratingRouter from './routes/ratings.js';

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uri = process.env.MONGO_URI;
mongoose.connect(uri); 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("✅ MongoDB database connection established successfully");
});

app.use('/students', studentsRouter); 
app.use('/skip-requests', skipRequestsRouter);
app.use('/api/auth', authRouter); 
app.use('/menu', menuRouter);
app.use('/api/feedback',feedbackRoutes);
app.use('/api/ratings',ratingRouter);

app.post('/api/upload-photo', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.file.buffer.toString('base64')}`);
    const newPhoto = new Photo({ url: result.secure_url });
    await newPhoto.save();
    res.status(201).json({ url: newPhoto.url, _id: newPhoto._id });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: 'Failed to upload photo.' });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: 'Failed to fetch photos.' });
  }
});



cron.schedule('0 0 * * *', async () => {


  console.log('⏰ Running daily kitchen team rotation...');
  try {
      const activeStudents = await Student.find({ status: 'active' }).sort({ turnOrder: 1 });
      const teamSize = 5;
      if (activeStudents.length >= teamSize) {
          const onDutyTeam = activeStudents.slice(0, teamSize);
          const offDutyStudents = activeStudents.slice(teamSize);
          const newOrder = [...offDutyStudents, ...onDutyTeam];
          const tempUpdatePromises = newOrder.map((student, index) => 
              Student.findByIdAndUpdate(student._id, { turnOrder: index + 1000 })
          );
          await Promise.all(tempUpdatePromises);
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

cron.schedule('0 0 * * *', async () => {



    console.log('🧹 Running daily data reset task...');
    try {
        await Menu.deleteMany({});
        console.log('✅ Today\'s menu has been cleared.');
        await Feedback.deleteMany({});
        console.log('✅ All feedback has been cleared.');
        await Photo.deleteMany({});
        console.log('✅ All uploaded photos have been cleared.');
    } catch (error) {
        console.error('🚫 Error during daily data reset:', error);
    }
});


cron.schedule('0 0 * * *', async () => { 
    console.log('⏳ Running cron job to delete old resolved skip requests...');
    const timeLimitInMs =  24 * 60 * 60 * 1000;



    const timeThreshold = new Date(Date.now() - timeLimitInMs);
    
    try {
        const result = await SkipRequest.deleteMany({
            status: { $in: ['Approved', 'Rejected'] },
            createdAt: { $lt: timeThreshold }
        });
        console.log(`✅ Deleted ${result.deletedCount} old resolved skip requests.`);
    } catch (error) {
        console.error('🚫 Error deleting old skip requests:', error);
    }
});

app.listen(port, () => {

  console.log(`🚀 Server started on https://kitchen-turn-project-1-yl2f.onrender.com:${port}`);

});

