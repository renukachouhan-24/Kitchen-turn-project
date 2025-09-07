import mongoose from 'mongoose';
const { Schema } = mongoose;

const skipRequestSchema = new Schema({
  studentName: { type: String, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: 'Pending' 
  }
}, {
  timestamps: true,
});

const SkipRequest = mongoose.model('SkipRequest', skipRequestSchema);

export default SkipRequest;