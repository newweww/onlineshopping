const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express()
app.use(cors())

const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    password:'12345678',
    database: 'skdb'
})

app.get('/', (re, res) => {
    return res.json("backend");
})

app.get('/product', (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listenning");
})