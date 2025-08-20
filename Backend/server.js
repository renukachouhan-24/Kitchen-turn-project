// // import express from "express";
// // import cors from "cors";

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // test route
// // app.get("/", (req, res) => {
// //   res.send("Backend is running...");
// // });

// // app.listen(5000, () => {
// //   console.log("Server started on http://localhost:5000");
// // });

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected successfully"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// // test route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// app.listen(5000, () => {
//   console.log("Server started on http://localhost:5000");
// });


// server.js

// server.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Use API routes
app.use("/api/menu", menuRoutes);
app.use("/api/team", teamRoutes);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});