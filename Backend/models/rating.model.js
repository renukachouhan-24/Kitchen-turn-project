import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    teamMembers: {
        type: [String],
        required: true,
    },
    totalStars: {
        type: Number,
        default: 0
    },
    voteCount: { 
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;