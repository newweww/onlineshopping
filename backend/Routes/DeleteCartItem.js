import express from "express";
import db from "../utils/db.js";

const DeleteCartItem = express()

DeleteCartItem.delete("/deletecartitem/:item_id", (req, res) => {
    const sql = "delete from cart where item_id = ? ";
    const id = req.params.item_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

export { DeleteCartItem as deletecartitem }; 