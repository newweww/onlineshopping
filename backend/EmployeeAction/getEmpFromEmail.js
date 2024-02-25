import express from "express";
import db from "../utils/db.js";

const getEmployeeFromEmail = express()

getEmployeeFromEmail.get("/getemployeefromemail/:email", (req, res) => {
  const email = req.params.email;
  db.query("SELECT * FROM employee WHERE email = ?", [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

export { getEmployeeFromEmail as efe }; 