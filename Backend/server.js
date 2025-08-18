import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
