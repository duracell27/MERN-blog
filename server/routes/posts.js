import { Router } from "express";
import { createPost, getAll, getById } from "../controllers/posts.js";
import { checkAuth } from "../utils/check.js";

const router = new Router();

//Create post
//http://localhost:3002/api/posts/
router.post('/', checkAuth, createPost)

//get all posts
//http://localhost:3002/api/posts/
router.get('/', getAll)

//get post by id
//http://localhost:3002/api/posts/:id
router.get('/:id', getById)

export default router