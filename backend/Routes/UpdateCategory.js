import express from "express";
import db from "../utils/db.js";

const UpdateCategory = express()

UpdateCategory.put("/updatecategory/:category_id", (req, res) => {
    const sql = "UPDATE category SET category_name = ? WHERE category_id = ?";
    const values = [
      req.body.category_name
    ];
    const id = req.params.category_id;
    
    db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
export { UpdateCategory as updatecategory }; 
