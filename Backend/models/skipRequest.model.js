// backend/models/skipRequest.model.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const skipRequestSchema = new Schema({
  studentName: { type: String, required: true },
  reason: { type: String, required: true },
  startDate: { type: Date, required: true },
  numberOfDays: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    default: 'Pending' // Jab bhi nayi request aayegi, by default 'Pending' hogi
  }
}, {
  timestamps: true,
});

const SkipRequest = mongoose.model('SkipRequest', skipRequestSchema);

export default SkipRequest;