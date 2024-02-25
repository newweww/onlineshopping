import express from "express";
import db from "../utils/db.js";

const DeleteCategory = express()

DeleteCategory.delete("/deletecategory/:category_id", (req, res) => {
    const sql = "delete from category where category_id = ? ";
    const id = req.params.category_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

export { DeleteCategory as deletecateogry }; 