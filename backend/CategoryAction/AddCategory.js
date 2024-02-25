import express from "express";
import db from "../utils/db.js";

const AddCategory = express()

AddCategory.post("/", (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO category (category_name) VALUES (?)";
    const values = [category_name];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ message: "Product created successfully", data });
    });
});

export { AddCategory as addcategory }; 