import express from "express";
import db from "../utils/db.js";

const cart = express()

cart.get('/getcart', (req, res) => {
    const sql = "SELECT * FROM cart";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

export { cart }; 