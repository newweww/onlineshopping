import express from "express";
import db from "../utils/db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = express.Router()
router.use(cookieParser()); 

router.post('/login', (req, res) => {
    const sql = "SELECT * from admin WHERE email = ? and password = ?"
    const sql2 = "SELECT * from login WHERE email = ? and password = ?"
    
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email},
                "jwt_secret_key",
                { expiresIn: '1d' });
            res.cookie('token', token)
            return res.json({ loginStatus: true, role: "admin"})
        } else {
            // User login part
            db.query(sql2, [req.body.email, req.body.password], (err, result) => {
                if (err) return res.json({ loginStatus: false, Error: "Query error" })
                if (result.length > 0) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: "user", email: email},
                        "jwt_secret_key",
                        { expiresIn: '1d' });
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, role: "user"})
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong email or password" })
                }
            })
        }
    })
})

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'jwt_secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

router.get('/protected-route', authenticateToken, (req, res) => {
    const role = req.user.role;
    const email = req.user.email;
    res.json({ role, email,  message: 'Access granted to protected route' });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

router.get('/admincount', (req, res) => {
    const sql = "SELECT count(emp_id) as admin from admin";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error:"Query error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/productcount', (req, res) => {
    const sql = "SELECT count(product_id) as product from product";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error:"Query error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/adminrecords', (req, res) => {
    const sql = "SELECT * from employee";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error:"Query error" + err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/productrecords', (req, res) => {
    const sql = "SELECT * from product";
    db.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error:"Query error" + err})
        return res.json({Status: true, Result: result})
    })
})

export { router as adminRouter }