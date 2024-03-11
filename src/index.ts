import { AppDataSource } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import * as dotenv from "dotenv"
import { errorHandler } from "./middlewares/error.middleware"
import { userRouter } from "./routes/user.routes"
import { blogRouter } from "./routes/blog.routes"
import "reflect-metadata"

dotenv.config()

const app = express()
app.use(express.json())
app.use(errorHandler)
const { PORT = 3000 } = process.env

app.use("/auth", userRouter)
app.use("/blog", blogRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({message:"Hello"})
})
app.get("*", (req: Request, res: Response) => {
    res.status(404).json({message:"not found"})
})

AppDataSource.initialize().then(async () => {
    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT)
    })
    console.log("Data source has been initialized")
}).catch(error => console.log(error))
