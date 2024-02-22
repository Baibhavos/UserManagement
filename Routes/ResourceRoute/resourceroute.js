import express from "express";
import { createResource, updateResource, deleteResource } from "../../controller/ResourcesController/resourcesController.js";

const router = express.Router();

router.post('/', createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

export default router;
