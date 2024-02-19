const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express()
app.use(cors())

const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    password:'12345678',
    database: 'skdb'
})

app.get('/', (re, res) => {
    return res.json("backend");
})

app.get('/category/cartoon', (req, res) => {
    const sql = "SELECT * FROM product p JOIN category c ON p.category_id = c.category_id WHERE category_name = 'Cartoon'";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/category/programming', (req, res) => {
    const sql = "SELECT * FROM product p JOIN category c ON p.category_id = c.category_id WHERE category_name = 'Programming'";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/category/cooking', (req, res) => {
    const sql = "SELECT * FROM product p JOIN category c ON p.category_id = c.category_id WHERE category_name = 'Cooking'";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/category/novel', (req, res) => {
    const sql = "SELECT * FROM product p JOIN category c ON p.category_id = c.category_id WHERE category_name = 'novel'";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/product', (req, res) => {
    const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/page/category/:category_name", (req, res) => {
    const category_name = req.params.category_name;
    // Fetch all products for a specific category from the database
    db.query("SELECT * FROM product p JOIN category c ON p.category_id = c.category_id WHERE category_name = ?", [category_name], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No products found for the specified category" });
        }

        res.json(results);
    });
});

app.get('/hot_product', (req, res) => {
    const sql = "SELECT p.product_id, p.name, c.category_name FROM product p join category c on p.category_id = c.category_id order by name LIMIT 3";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/product/:product_id", (req, res) => {
    const product_id = req.params.product_id;
    // Fetch a specific product from the database
    db.query("SELECT * FROM product p join category c on p.category_id = c.category_id WHERE product_id = ?", [product_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(results[0]);
    });
  });

app.listen(8081, () => {
    console.log("listenning");
})