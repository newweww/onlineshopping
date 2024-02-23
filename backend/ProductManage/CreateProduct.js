import express from "express";
import db from "../utils/db.js";

const CreateProduct = express()

CreateProduct.post("/", (req, res) => {
    const { name, category_id, price, stock } = req.body;

    if (!name || !category_id || !price || !stock) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO product (name, category_id, price, stock) VALUES (?, ?, ?, ?)";
    const values = [name, category_id, price, stock];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ message: "Product created successfully", data });
    });
});

export { CreateProduct as create }; 