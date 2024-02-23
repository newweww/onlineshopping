import express from "express";
import db from "../utils/db.js";

const DeleteProduct = express()

DeleteProduct.delete("/delete/:product_id", (req, res) => {
    const sql = "delete from product where product_id = ? ";
    const id = req.params.product_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

export { DeleteProduct as deleteproduct }; 