// backend/models/feedback.model.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    comment: { type: String, required: true },
    // Hum baad mein yahan student ki ID bhi store kar sakte hain
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;