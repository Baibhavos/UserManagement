import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    role_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        max: 50,
    },
    description: {
        type: String,
    },
},{timestamps: true});

const Roles = mongoose.model('Role', RoleSchema);

export default Roles;