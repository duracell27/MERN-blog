import { Router } from "express";
import { createPost } from "../controllers/posts.js";
import { checkAuth } from "../utils/check.js";

const router = new Router();

//Creaye post
//http://localhost:3002/api/posts/
router.post('/', checkAuth, createPost)


export default router