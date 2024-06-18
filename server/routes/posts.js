import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,  
} from "../controllers/postsController.js";

const router = new Router();

//Create Post
//http://localhost:3002/api/posts
// дякуючи middleware checkAuth ми отримуемо вшитий у request headers ідентифікатор User-a через зашифровку token
router.post("/", checkAuth, createPost);

export default router;