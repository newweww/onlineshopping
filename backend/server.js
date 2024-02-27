import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import db from "./utils/db.js";
import { adminRouter } from "./Routes/AdminRoute.js";
import { product } from "./ProductManage/Product.js";
import { category } from "./CategoryAction/Category.js";
import { pfc } from "./ProductManage/getProductFromCategory.js";
import { pfi } from "./ProductManage/getProductById.js";
import { create } from "./ProductManage/CreateProduct.js";
import { update } from "./ProductManage/UpdateProduct.js";
import { deleteproduct } from "./ProductManage/DeleteProduct.js";
import { addcategory } from "./CategoryAction/AddCategory.js";
import { addemployee } from "./EmployeeAction/AddEmployee.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { employee } from "./EmployeeAction/employee.js";
import { deleteemployee } from "./EmployeeAction/DeleteEmployee.js";
import { deletecateogry } from "./CategoryAction/DeleteCategory.js";
import { updatecategory } from "./CategoryAction/UpdateCategory.js";
import { cfi } from "./CategoryAction/getCategoryFromId.js";
import { efi } from "./EmployeeAction/getEmployeeFromId.js";
import { updateemp } from "./EmployeeAction/UpdateEmployee.js";
import { efe } from "./EmployeeAction/getEmpFromEmail.js";
import { addcustomer } from "./Routes/Register.js";
import { addcart } from "./Routes/AddCart.js";
import { cart } from "./Routes/getCart.js";
import { cbi } from "./Routes/getCartItemById.js";
import { deletecartitem } from "./Routes/DeleteCartItem.js";
import { totalPrice } from "./Routes/getTotalPrice.js";
import { cbpi } from "./Routes/getCartbyProductId.js";
import { updatecart } from "./Routes/updateCart.js";

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

app.use('/auth', adminRouter)
app.use('/product', product)
app.use('/category', category)
app.use('/page/category/:category_name', pfc);
app.use('/', pfi);
app.use('/create', create);
app.use('/', update);
app.use('/', deleteproduct);
app.use('/addcategory', addcategory);
app.use('/addemployee', addemployee);
app.use('/employee', employee);
app.use('/', deleteemployee);
app.use('/', deletecateogry);
app.use('/', updatecategory);
app.use('/', cfi)
app.use('/', efi)
app.use('/', updateemp)
app.use('/', efe)
app.use('/register', addcustomer)
app.use('/', addcart)
app.use('/', cart)
app.use('/', cbi)
app.use('/', deletecartitem)
app.use('/', totalPrice)
app.use('/', cbpi)
app.use('/', updatecart)

app.listen(8081, () => {
  console.log("listenning");
})