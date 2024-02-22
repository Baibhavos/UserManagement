import express from "express";
import { createRole, updateRole, deleteRole } from "../../controller/RolesController/roleController.js";

const router = express.Router();

router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;
