const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json());

const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    password:'12345678',
    database: 'skdb',
    dateStrings: 'data'
})

app.get('/', (re, res) => {
    return res.json("backend");
})


app.get('/product', (req, res) => {
    const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by product_id";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/category', (req, res) => {
    const sql = "SELECT category_name FROM category ";
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

app.get("/getproductbyid/:product_id", (req, res) => {
    const product_id = req.params.product_id;
    // Fetch all products for a specific category from the database
    db.query("select * from product where product_id = ?", [product_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No products found for the specified id" });
        }

        res.json(results);
    });
});


app.get('/hot_product', (req, res) => {
    const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by name LIMIT 3";
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

  app.post("/create", (req, res) => {
    const { name, category_id, price, stock } = req.body;

    if (!name || !category_id || !price || !stock) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO product (name, category_id, price, stock) VALUES (?, ?, ?, ?)";
    const values = [name, category_id, price, stock];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({ message: "Product created successfully", data });
    });
});

app.put("/update/:product_id", (req, res) => {
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

  app.delete("/delete/:product_id", (req, res) => {
    const sql = "delete from product where product_id = ? ";
    const id = req.params.product_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })


app.listen(8081, () => {
    console.log("listenning");
})