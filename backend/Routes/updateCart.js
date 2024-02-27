import express from "express";
import db from "../utils/db.js";

const UpdateCart = express()

UpdateCart.put("/updatecart/:product_id", (req, res) => {
    const { quantity, total_price } = req.body;
    const sql = "UPDATE cart SET quantity = ?, total_price = ? WHERE product_id = ?";
    const values = [quantity, total_price];
    const id = req.params.product_id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

export { UpdateCart as updatecart };
