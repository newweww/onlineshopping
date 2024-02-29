import express from "express";
import cors from "cors";
import db from "./utils/db.js";
import { adminRouter } from "./Routes/AdminRoute.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { addcustomer } from "./Routes/Register.js";
import { category } from "./CategoryAction/CategoryAction.js";
import { product } from "./ProductManage/ProductAction.js";
import { cart } from "./CartAction/CartAction.js";
import { employee } from "./EmployeeAction/EmployeeAction.js";
import { customer } from "./Customer/CustomerAction.js";

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('Public'))
app.use('/Images', express.static(path.join(__dirname, 'Public/images')));

app.get('/Image/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log('Image Path:', path.join(__dirname, 'Public/images', filename));
  res.sendFile(path.join(__dirname, 'Public/images', filename));
});

app.get('/', (re, res) => {
  return res.json("backend");
})


app.get('/hot_product', (req, res) => {
  const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by name LIMIT 3";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.get('/new_product', (req, res) => {
  const sql = "SELECT * FROM product p join category c on p.category_id = c.category_id order by name DESC LIMIT 3";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.use('/auth', adminRouter)
app.use('/', product)
app.use('/', category)
app.use('/', cart)
app.use('/', employee)
app.use('/register', addcustomer)
app.use('/', customer)


app.listen(8081, () => {
  console.log("listenning");
})