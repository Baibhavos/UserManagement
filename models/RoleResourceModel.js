import mongoose from 'mongoose';


const RoleResourceSchema = new mongoose.Schema({
    role_resource_id: {
        type: String,
        required: true,
        unique: true,
    },
    role_id: {
        type: mongoose.Types.ObjectId, required: true, ref: 'Role'
    },
    resource_id: {
        type: mongoose.Types.ObjectId, required: true, ref: 'Resource'
    },
    permission: {
        type: String,
        enum: ['READ', 'EDIT'],
        default: 'READ',
        required: true,
    }
}, {timestamps: true});

const RoleResourceMapping = mongoose.model('RoleResourceMapping', RoleResourceSchema);

export default RoleResourceMapping;