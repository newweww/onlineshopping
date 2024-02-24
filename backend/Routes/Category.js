import express from "express";
import db from "../utils/db.js";

const category = express()

category.get('/', (req, res) => {
    const sql = "SELECT * FROM category ";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

export { category }; 