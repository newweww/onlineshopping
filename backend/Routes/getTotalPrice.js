import express from "express";
import db from "../utils/db.js";

const totalPrice = express()

totalPrice.get('/gettotalprice', (req, res) => {
    const sql = "SELECT SUM(total_price) FROM cart";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

export { totalPrice }; 