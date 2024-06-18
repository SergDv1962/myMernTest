import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost, 
  getAll, 
} from "../controllers/postsController.js";

const router = new Router();

//Create Post
//http://localhost:3002/api/posts
// дякуючи middleware checkAuth ми отримуемо вшитий у request headers ідентифікатор User-a через зашифровку token
router.post("/", checkAuth, createPost);

//Get All Posts
//http://localhost:3002/api/posts
router.get("/", getAll);

export default router;