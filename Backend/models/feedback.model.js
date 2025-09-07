import mongoose from 'mongoose';
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    comment: { type: String, required: true },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;