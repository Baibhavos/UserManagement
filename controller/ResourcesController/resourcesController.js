import Resources from '../../models/ResourcesModel.js';
import RoleResourceMapping from '../../models/RoleResourceModel.js';
import {v4 as uuid} from 'uuid';


export const createResource = async (req, res) => {
    const { resource_name, resource_type } = req.body;

    const newResource = await new Resources({
        resource_id: uuid(),
        resource_name,
        resource_type,
    }).save();

    res.status(201).json(newResource);
}

export const deleteResource = async (req, res) => {
    const { id } = req.params;

    const deleteResourceMapping = await RoleResourceMapping.deleteMany({resource_id: id});
    const deletedResource = await Resources.findByIdAndDelete(id);

    res.json(deletedResource, deleteResourceMapping);
}

export const updateResource = async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    const updatedResource = await Resources.findByIdAndUpdate(id, {...data});

    res.json(updatedResource);
}