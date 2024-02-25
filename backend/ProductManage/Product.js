import express from "express";
import db from "../utils/db.js";

const product = express()

product.get('/', (req, res) => {
    const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by product_id";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

export { product }; 