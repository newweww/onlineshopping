import express from "express";
import db from "../utils/db.js";

const cart = express()

cart.get('/getcart', (req, res) => {
    const sql = "SELECT * FROM cart";
    const sql2 = "SELECT SUM(total_price) as totalPrice FROM cart";

    db.query(sql, (err, cartItems) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching cart items" });
        }

        db.query(sql2, (err, totalPrice) => {
            if (err) {
                return res.status(500).json({ error: "Error fetching total price" });
            }

            const response = {
                cartItems: cartItems,
                totalPrice: totalPrice[0].totalPrice
            };

            res.json(response);
        });
    });
});

cart.post('/addcart', (req, res) => {

    const sql = "INSERT INTO cart \
                (`name`, `price`, `quantity`, `total_price`, `image` , `product_id`) \
                VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.price,
        req.body.quantity,
        req.body.total_price,
        req.body.image,
        req.body.product_id
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting employee data" });
        }
        return res.json({ success: true });
    })
}
);


cart.put("/updatecart/:product_id", (req, res) => {
    const { quantity, total_price } = req.body;
    const sql = "UPDATE cart SET quantity = ?, total_price = ? WHERE product_id = ?";
    const values = [quantity, total_price];
    const id = req.params.product_id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

cart.delete("/deletecartitem/:item_id", (req, res) => {
    const sql = "delete from cart where item_id = ? ";
    const id = req.params.item_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

cart.delete("/deletecart", (req, res) => {
    const sql = "DELETE FROM cart";
    db.query(sql , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

  cart.get("/getcartbyid/:product_id", (req, res) => {
    const product_id = req.params.product_id;
    db.query("SELECT * FROM cart WHERE product_id = ?", [product_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(results[0]);
    });
  });

  cart.get("/getcartitembyproductid/:product_id", (req, res) => {
    const product_id = req.params.product_id;
    db.query("SELECT quantity, total_price, product_id FROM cart WHERE product_id = ?", [product_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(results[0]);
    });
  });

  cart.get("/getcartitembyid/:item_id", (req, res) => {
    const item_id = req.params.item_id;
    db.query("SELECT * FROM cart WHERE item_id = ?", [item_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(results[0]);
    });
  });

  cart.get('/gettotalprice', (req, res) => {
    const sql = "SELECT SUM(total_price) FROM cart";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

export { cart }; 