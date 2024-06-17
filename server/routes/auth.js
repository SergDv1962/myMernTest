import { Router } from "express";
import { register } from "../controllers/authControllers.js"


const router = new Router();

//Register
//http://localhost:3002/api/auth/register
router.post('/register', register)

export default router