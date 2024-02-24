import express from "express";
import db from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post('/login', (req, res) => {
    const sql = "SELECT * from admin WHERE email = ? and password = ?"
    const sql2 = "SELECT * from login WHERE email = ? and password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false , Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email },
                "jwt_secret_key",
                { expiresIn: '1d' });
            res.cookie('token', token)
            return res.json({ loginStatus: true , role: "admin"})
        } else {
            db.query(sql2, [req.body.email, req.body.password], (err, result) => {
                if (err) return res.json({ loginStatus: false, Error: "Query error" })
                if (result.length > 0) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: "user", email: email },
                        "jwt_secret_key",
                        { expiresIn: '1d' });
                    res.cookie('token', token)
                    return res.json({ loginStatus: true ,  role: "user" })
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong email or password" })
                }
            })
        }
    })
})

export { router as adminRouter }