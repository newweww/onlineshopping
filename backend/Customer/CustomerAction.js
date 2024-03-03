import express from "express";
import db from "../utils/db.js";

const customer = express()

customer.get('/order', (req, res) => {
    const sql = "SELECT * FROM orders o join customer c on c.customer_id = o.customer_id";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

customer.get('/order/:email', (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM orders o join customer c on c.customer_id = o.customer_id WHERE email = ?";
  db.query(sql,[email], (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})


customer.delete("/deleteorder/:order_id", (req, res) => {
    const sql = "delete from orders where order_id = ? ";
    const id = req.params.order_id
    db.query(sql, [id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    })
  })

customer.get("/getcustomerfromemail/:email", (req, res) => {
    const email = req.params.email;
    db.query("SELECT * FROM customer WHERE email = ?", [email], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(results[0]);
    });
  });

customer.get("/getcustomerfromid/:customer_id", (req, res) => {
    const customer_id = req.params.customer_id;
    db.query("SELECT * FROM customer WHERE customer_id = ?", [customer_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(results[0]);
    });
  });

export { customer }; 