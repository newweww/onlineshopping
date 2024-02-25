import express from "express";
import db from "../utils/db.js";
import multer from 'multer';
import path from 'path';

const AddEmployee = express();


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

AddEmployee.post('/', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee \
                (`name`, `lastname`, `email`, `password`, `salary` , `image`) \
                VALUES (?, ?, ?, ?, ?, ?)"
    const values = [
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.salary,
        req.file.filename
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
export { AddEmployee as addemployee };
