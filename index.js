import express from 'express';
import userRoutes from './Routes/UserRoutes/userRoutes.js';
import roleRoutes from './Routes/rolesRoute/rolesRoute.js';
import resourceRoutes from './Routes/ResourceRoute/resourceroute.js';
import dotenv from 'dotenv';
import RoleResourceMapping from './models/RoleResourceModel.js';
import {v4 as uuid} from 'uuid';
import User from './models/UserModel.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/resource', resourceRoutes);

//API to assign/map a resource with a role.
app.post('/map', async (req, res) => {
    const { role_id, resource_id, permission } = req.params;

    const mapData = await new RoleResourceMapping({
        role_resource_id: uuid(),
        resource_id,
        role_id,
        permission
    }).save();

    res.json(mapData);
});

//API to assign a role to a User.
app.put('/useRole', async (req, res) => {
    const { id, role_id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, {role_id});

    res.json(updatedUser);
});

// API to Update Role Resource Mapping Permission.
app.put('/map/per', async(req, res) => {
    const { id, permission } = req.params;

    const updatedData = await RoleResourceMapping.findByIdAndUpdate(id, {permission});

    res.json(updatedData);
});

// API for User Authentication using JWT Token.
app.post('user/login', async(req, res) => {
    const { email, phone } = req.body;

    const user = await User.findOne({email: email, phone: phone});

    if(!user) return res.status(400).json({msg: 'User does not exist'});

    const token = jwt.sign({id: user.user_id, email: email}, 'This is secret');

    res.status(200).json(token);
});

app.get('/', (req, res) => {
    res.json("Hello worlds");
});

mongoose.connect(process.env.MONGODB_URL).then(() => {

    app.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    });
}).catch((err) => console.log(` Can't conect to mongoDB`));
