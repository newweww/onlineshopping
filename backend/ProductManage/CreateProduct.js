import express from "express";
import db from "../utils/db.js";
import multer from 'multer';
import path from 'path';

const CreateProduct = express()

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

CreateProduct.post('/', upload.single('image'), (req, res) => {
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
export { CreateProduct as create }; 