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


export { cart }; 