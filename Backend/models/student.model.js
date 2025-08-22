// // backend/models/student.model.js

// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const studentSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   joiningDate: {
//     type: Date,
//     required: true
//   },
//   totalTurns: {
//     type: Number,
//     default: 0
//   },
// }, {
//   timestamps: true,
// });

// const Student = mongoose.model('Student', studentSchema);

// export default Student; // <-- Yahan bhi 'export default' hona chahiye

// backend/models/student.model.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { // Naya field
    type: String,
    required: true,
    unique: true, // Har student ka email alag hoga
    trim: true,
  },
  password: { // Naya field
    type: String,
    required: true,
  },
  joiningDate: { type: Date, required: true },
  totalTurns: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);
export default Student;