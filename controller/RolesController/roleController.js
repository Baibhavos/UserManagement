import Roles from '../../models/RolesModel.js';
import RoleResourceMapping from '../../models/RoleResourceModel.js';
import {v4 as uuid} from 'uuid';


export const createRole = async (req, res) => {
    const {title, description} = req.body;

    const newRole = await new Roles({
        role_id: uuid(),
        title,
        description,
    }).save();

    res.statue(200).json(newRole);
}

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const updatedRole = await Roles.findByIdAndUpdate(id, {
        ...data,
    });

    res.json(updatedRole);
}

export const deleteRole = async (req, res) => {
    const { id } = req.params;

    const deletedRole = await Roles.findByIdAndDelete(id);
    const deleteRoleResourceMapping = await RoleResourceMapping.findOneAndDelete({role_id: id});

    res.json(deletedRole, deleteRoleResourceMapping);
}