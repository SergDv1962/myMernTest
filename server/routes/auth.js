import { Router } from "express";
import { register, login } from "../controllers/authControllers.js"


const router = new Router();

//Register
//http://localhost:3002/api/auth/register
router.post('/register', register)

//Login
//http://localhost:3002/api/auth/login
router.post('/login', login)

export default router