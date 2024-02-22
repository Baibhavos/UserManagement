import Resource from '../../models/ResourcesModel.js';
import RoleResourceMapping from '../../models/RoleResourceModel.js';
import Roles from '../../models/RolesModel.js';
import User  from '../../models/UserModel.js';
import {v4 as uuid} from 'uuid';


export const createUser = async (req, res) => {
    try {

        const {name, email, phone, isActive} = req.body;

        const newUser = await new User({
            user_id: uuid(),
            name,
            email,
            phone,
            isActive,
        }).save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getUserById = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    const role = await Roles.findOne({role_id: user.role_id});
    const roleResourceMappingData = await RoleResourceMapping.findOne({role_id: user.role_id});
    const resources = await Resource.findOne({resource_id: roleResourceMappingData.resource_id});

    res.status(200).json(user, role, resources);
}

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(200).json(deletedUser);
}

export const updateUser = async (req, res) => {
    const data = req.body;
    const {userId} = req.params;

    const updatedUser = await User.findByIdAndUpdate(userId, {
        ...data,
        updatedAt: Date.now()
    })

    res.status(200).json(updatedUser);
}