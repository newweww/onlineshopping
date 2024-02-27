import express from "express";
import db from "../utils/db.js";

const category = express()

category.get('/category', (req, res) => {
    const sql = "SELECT * FROM category ";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

category.post("/addcategory", (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO category (category_name) VALUES (?)";
    const values = [category_name];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ message: "Product created successfully", data });
    });
});

category.delete("/deletecategory/:category_id", (req, res) => {
    const sql = "delete from category where category_id = ? ";
    const id = req.params.category_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

category.get("/getcategorybyid/:category_id", (req, res) => {
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

category.put("/updatecategory/:category_id", (req, res) => {
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
  


export { category }; 