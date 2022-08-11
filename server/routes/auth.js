import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/check.js";

const router = new Router();

//Register
//http://localhost:3002/api/auth/register
router.post('/register', register)

//Login
//http://localhost:3002/api/auth/login
router.post('/login', login)

//Get me
//http://localhost:3002/api/auth/getMe
router.post('/getMe', checkAuth, getMe)

export default router