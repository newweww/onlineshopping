import express from "express";
import db from "../utils/db.js";

const getEmployeeById = express()

getEmployeeById.get("/getemployeebyid/:emp_id", (req, res) => {
  const emp_id = req.params.emp_id;
  db.query("SELECT * FROM employee WHERE emp_id = ?", [emp_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

export { getEmployeeById as efi }; 