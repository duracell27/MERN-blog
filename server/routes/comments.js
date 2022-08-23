import { Router } from "express";
import { createComment } from "../controllers/comments.js";
import { checkAuth } from "../utils/check.js";

const router = new Router();

//create comment
//http://localhost:3002/api/comments/:id

router.post('/:id', checkAuth, createComment)

export default router