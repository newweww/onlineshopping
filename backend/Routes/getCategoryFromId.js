import express from "express";
import db from "../utils/db.js";

const getCategoryById = express()

getCategoryById.get("/getcategorybyid/:category_id", (req, res) => {
  const category_id = req.params.category_id;
  db.query("SELECT * FROM category WHERE category_id = ?", [category_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

export { getCategoryById as cfi }; 