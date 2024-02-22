import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    resource_id: {
        type: String,
        required:true,
        unique: true,
    },
    resource_name: {
        type: String,
        max: 50,
        required: true,
    },
    resource_type: {
        type: String,
        enum: ['API', 'WIDGET', 'MODULE'],
        default: 'API',
        required: true,
    }
}, {timestamps: true});

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;