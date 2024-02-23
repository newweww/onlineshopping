import mysql2 from "mysql2";

const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    password:'12345678',
    database: 'skdb',
    dateStrings: 'data'
})

export default db;