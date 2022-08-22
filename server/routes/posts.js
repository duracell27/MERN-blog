import { Router } from "express";
import { createPost, getAll, getById, getMyPosts, removePost, updatePost } from "../controllers/posts.js";
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

//get my posts
//http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

//remove post
//http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)

//update post by id
//http://localhost:3002/api/posts/:id/edit
router.put('/:id', checkAuth, updatePost)

export default router