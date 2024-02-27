import express from "express";
import db from "../utils/db.js";

const getCartItemByProductId = express()

getCartItemByProductId.get("/getcartitembyproductid/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  db.query("SELECT quantity, total_price, product_id FROM cart WHERE product_id = ?", [product_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

export { getCartItemByProductId as cbpi }; 