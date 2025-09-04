import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { 
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    password: { 
        type: String,
        required: true,
    },
    joiningDate: { type: Date, required: true },
    totalTurns: { type: Number, default: 0 },
    status: { 
        type: String,
        required: true,
        default: 'active' 
    },
    turnOrder: { type: Number, required: true }, 
    // === NAYA FIELD ===
    approvedRequestCount: {
        type: Number,
        default: 0
    },
    // ==================
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);
export default Student;