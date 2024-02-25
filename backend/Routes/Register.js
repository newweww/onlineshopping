import express from "express";
import db from "../utils/db.js";
import multer from 'multer';
import path from 'path';

const AddCustomer = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');

AddCustomer.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error uploading file" });
        }

        const sql = "INSERT INTO customer \
                    (`name`, `lastname`, `phone` , `address` ,`email`, `password` , `image`) \
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
        const sql2 = "INSERT INTO login \
                    (`email`, `password`) \
                    VALUES (?, ?)";
        const values = [
            req.body.name,
            req.body.lastname,
            req.body.phone,
            req.body.address,
            req.body.email,
            req.body.password,
            req.file.filename
        ];
        const values2 = [
            req.body.email,
            req.body.password
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error inserting employee data" });
            }
            db.query(sql2, values2, (err2, data2) => {
                if (err2) {
                    return res.status(500).json({ error: "Error inserting admin data" });
                }
                return res.json({ success: true });
            });
        });
    });
});

export { AddCustomer as addcustomer };
