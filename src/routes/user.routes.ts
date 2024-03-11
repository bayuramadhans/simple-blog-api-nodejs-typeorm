import * as express from "express";
import { authentification, authorization } from "../middlewares/auth.middleware"
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const Router = express.Router();

// get all users
Router.get('/', authentification, authorization(["admin"]), UserController.getUsers);
// get user profile
Router.get('/profile', authentification, authorization(["user","admin"]), AuthController.getProfile);
// update user profile
Router.put('/update/:id', authentification, authorization(["user","admin"]),UserController.updateUser)
// delete user profile
Router.delete('/delete/:id', authentification, authorization(["admin"]), UserController.deleteUser);


// sign up user
Router.post('/signup', UserController.signup);
// login user
Router.post('/login', AuthController.login);

export {Router as userRouter}