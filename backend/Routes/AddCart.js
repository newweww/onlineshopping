import express from "express";
import db from "../utils/db.js";
import multer from 'multer';
import path from 'path';

const AddCart = express();


AddCart.post('/addcart', (req, res) => {

        const sql = "INSERT INTO cart \
                    (`name`, `price`, `quantity`, `total_price`, `image` , `product_id`) \
                    VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.name,
            req.body.price,
            req.body.quantity,
            req.body.total_price,
            req.body.image,
            req.body.product_id
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error inserting employee data" });
            }
            return res.json({ success: true });
        })
    }
);
    

export { AddCart as addcart };
