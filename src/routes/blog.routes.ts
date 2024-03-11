import * as express from "express";
import { authentification, authorization } from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
import { BlogController } from "../controllers/blog.controller";

const Router = express.Router();

// get all blogs
Router.get('/', authentification, authorization(["user", "admin"]), BlogController.getBlogs);
// get blog by id
Router.get('/:id', authentification, authorization(["user", "admin"]), BlogController.getBlogById);
// create blog
Router.post('', authentification, authorization(["user", "admin"]), BlogController.createBlog);
// update blog
Router.put('/:id', authentification, authorization(["user", "admin"]), BlogController.updateBlog);
// delete blog
Router.delete('/:id', authentification, authorization(["user", "admin"]), BlogController.deleteBlog);

export { Router as blogRouter}