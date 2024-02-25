import express from "express";
import db from "../utils/db.js";

const image = express()

image.get("/image/:image", (req, res) => {
    const product_id = req.params.product_id;
    // Fetch a specific product from the database
    db.query("SELECT image FROM product WHERE product_id = ?", [product_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(results[0]);
    });
});

export { image }; 