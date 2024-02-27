import express from "express";
import db from "../utils/db.js";

const getCartItemById = express()

getCartItemById.get("/getcartitembyid/:item_id", (req, res) => {
  const item_id = req.params.item_id;
  db.query("SELECT * FROM cart WHERE item_id = ?", [item_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

export { getCartItemById as cbi }; 