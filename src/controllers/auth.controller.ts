import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                return res.status(400).json({
                    message: "email and password are required"
                })
            }
             const userRepository = AppDataSource.getRepository(User);
             const user = await userRepository.findOne({ where: { email } });
             if(!user){
                 return res.status(400).json({
                     message: "user not found"
                 })
             }

             const isPasswordValid = encrypt.comparepassword(user.password, password)
             if(!isPasswordValid){
                 return res.status(400).json({
                     message: "password is not valid"
                 })
             }
             const token = encrypt.generateToken({ id: user.id });
             return res.status(200).json({ message: "Login successful", user, token})
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    static async getProfile(req: Request, res: Response) {
        if(!req["currentUser"]) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const userReposiroty = AppDataSource.getRepository(User)
        const user = await userReposiroty.findOne({ 
            where: { id: req["currentUser"].id },
            relations : ['blogs']
        })
        return res.status(200).json({...user, password: undefined})
    }
}