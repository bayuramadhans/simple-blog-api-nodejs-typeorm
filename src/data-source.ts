import "reflect-metadata"
import { DataSource } from "typeorm"
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions"

import * as dotenv from "dotenv"
import { User } from "./entity/User"
import { Blog } from "./entity/Blog"

dotenv.config()
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Blog],
    migrations: [__dirname + "/migrations/*.ts"],
    subscribers: [],
})
