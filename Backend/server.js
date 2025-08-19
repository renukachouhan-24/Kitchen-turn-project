// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // test route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// app.listen(5000, () => {
//   console.log("Server started on http://localhost:5000");
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
