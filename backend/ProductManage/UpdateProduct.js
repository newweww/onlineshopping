import express from "express";
import db from "../utils/db.js";

const UpdateProduct = express()

UpdateProduct.put("/update/:product_id", (req, res) => {
    const sql = "UPDATE product SET name = ?, category_id = ?, price = ?, stock = ? WHERE product_id = ?";
    const values = [
      req.body.name,
      req.body.category_id,
      req.body.price,
      req.body.stock,
    ];
    const id = req.params.product_id;
    
    db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
export { UpdateProduct as update }; 