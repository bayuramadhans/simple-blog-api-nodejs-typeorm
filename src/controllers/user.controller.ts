import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import * as cache from "memory-cache";

export class UserController {
    static async signup(req: Request, res: Response) {
        const { name, email, password, role } = req.body;
        const encryptedPassword = await encrypt.encryptpass(password);
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = encryptedPassword;
        user.role = role;

        const userRepository = AppDataSource.getRepository(User);
        const checkUserByEmail = await userRepository.find({ where: { email: email}})
        if(checkUserByEmail.length > 0){
            return res.status(400).json({
                message: "user with email "+email+" already exists"
            })
        }
        await userRepository.save(user);

        const token = encrypt.generateToken({ id: user.id });

        return res.status(200).json({ message: "User created successfully", data: user, token: token})
    }
    static async getUsers(req: Request, res: Response) {
        const keyCache = "all_users"
        const data = cache.get(keyCache);
        if(data) {
            return res.status(200).json({data, cache: "true"});
        }else{
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();

            cache.put(keyCache, users, 300);
            return res.status(200).json({data: users, cache: "false"});
        }
    }
    static async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { id: id }});
        user.name = name;
        user.email = email;
        await userRepository.save(user);
        res.status(200).json({ message: "User updated successfully", data: user})
    }

    static async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { id }});
        await userRepository.remove(user);
        res.status(200).json({ message: "User deleted successfully", data: user})
    }
}