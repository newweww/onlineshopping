import express from "express";
import db from "../utils/db.js";
import multer from "multer";
import path from "path";

const product = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

product.get('/product', (req, res) => {
    const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by product_id";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

product.post('/create', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO product \
                (`name`, `category_id`, `price`, `stock`, `image`) \
                VALUES (?, ?, ?, ?, ?)"
    const values = [
        req.body.name,
        req.body.category_id,
        req.body.price,
        req.body.stock,
        req.file.filename
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

product.put("/update/:product_id", (req, res) => {
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

product.post("/stock_update/:product_id", (req, res) => {
    const sql = "UPDATE product SET stock = ? WHERE product_id = ?";
    const values = [
      req.body.stock,
      req.params.product_id
    ];

    db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json(err); 
      return res.json(data);
    });
});

product.get("/page/category/:category_name", (req, res) => {
    const category_name = req.params.category_name;
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

product.get("/getproductbyid/:product_id", (req, res) => {
    const product_id = req.params.product_id;
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

product.delete("/delete/:product_id", (req, res) => {
    const sql = "delete from product where product_id = ? ";
    const id = req.params.product_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

export { product }; 