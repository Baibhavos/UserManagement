import express from 'express';
import { createUser, getUserById, deleteUser } from '../../controller/UserController/userController.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);

export default router;