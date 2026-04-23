import { createPool } from "mysql2/promise";
import { loadEnvFile } from "node:process";

loadEnvFile()

const mysql = await createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSW,
    connectionLimit: 10,
    database: "",
    
})

export default mysql;