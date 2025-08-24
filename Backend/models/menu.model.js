// backend/models/menu.model.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const menuItemSchema = new Schema({
    foodName: { type: String, required: true, trim: true },
    nutrients: { type: String, required: true, trim: true },
});

const menuSchema = new Schema({
    date: { 
        type: Date, 
        required: true, 
        unique: true, 
        default: () => {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0); // <-- BADLAV: Use UTC hours for consistency
            return d;
        }
    },
    breakfast: [menuItemSchema],
    lunch: [menuItemSchema],
    snacks: [menuItemSchema],
    dinner: [menuItemSchema],
    kitchenTeam: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, {
    timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;




