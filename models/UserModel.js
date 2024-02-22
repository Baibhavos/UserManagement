import mongoose, { SchemaType, SchemaTypes } from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    phone: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    role_id: {
        type: mongoose.Types.ObjectId, ref: 'Roles'
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;