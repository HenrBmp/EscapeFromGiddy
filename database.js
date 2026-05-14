import { createPool } from 'mysql2/promise';

const mysql = await createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSW,
    connectionLimit: 10,
    database: process.env.DATABASE,
    host: process.env.MYSQL_HOST,
    port: 3306
});

export default mysql;
