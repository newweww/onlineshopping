import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import db from "./utils/db.js";
import { adminRouter } from "./Routes/AdminRoute.js";
import { product } from "./Routes/Product.js";
import { category } from "./Routes/Category.js";
import { pfc } from "./Routes/getProductFromCategory.js";
import { pfi } from "./Routes/getProductById.js";
import { create } from "./ProductManage/CreateProduct.js";
import { update } from "./ProductManage/UpdateProduct.js";
import { deleteproduct } from "./ProductManage/DeleteProduct.js";


const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json());

app.get('/', (re, res) => {
    return res.json("backend");
})

app.get('/hot_product', (req, res) => {
    const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by name LIMIT 3";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.use('/auth', adminRouter)
app.use('/product', product)
app.use('/category', category)
app.use('/page/category/:category_name', pfc);
app.use('/', pfi);
app.use('/create', create);
app.use('/', update);
app.use('/', deleteproduct );



app.listen(8081, () => {
    console.log("listenning");
})