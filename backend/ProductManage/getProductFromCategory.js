import express from "express";
import db from "../utils/db.js";

const getProductFromCategory = express()

getProductFromCategory.get("/", (req, res) => {
    const category_name = req.params.category_name;
    // Fetch all products for a specific category from the database
    db.query("SELECT * FROM product p JOIN category c ON p.category_id = c.category_id WHERE category_name = ?", [category_name], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No products found for the specified category" });
        }

        res.json(results);
    });
});

export { getProductFromCategory as pfc }; 