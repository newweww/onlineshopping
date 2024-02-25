import express from "express";
import db from "../utils/db.js";
import multer from 'multer';
import path from 'path';

const AddEmployee = express();

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

AddEmployee.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error uploading file" });
        }

        const sql = "INSERT INTO employee \
                    (`name`, `lastname`, `email`, `password`, `salary` , `image`) \
                    VALUES (?, ?, ?, ?, ?, ?)";
        const sql2 = "INSERT INTO admin \
                    (`email`, `password`) \
                    VALUES (?, ?)";
        const values = [
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.body.password,
            req.body.salary,
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

export { AddEmployee as addemployee };
