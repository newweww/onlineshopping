import express from "express";
import db from "../utils/db.js";

const employee = express()

employee.get('/', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

export { employee }; 