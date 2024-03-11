import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const authentification = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1]; 
    if(!token){
        return res.status(401).json({ message: "No token provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if(!decode){
        return res.status(401).json({ message: "Invalid token" });
    }
    req["currentUser"] = decode;
    next();
}

const authorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: req["currentUser"].id },
      });
      console.log(user);
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  };

export { authentification, authorization }