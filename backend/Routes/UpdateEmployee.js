import express from "express";
import db from "../utils/db.js";

const UpdateEmployee = express()

UpdateEmployee.put("/updateemployee/:emp_id", (req, res) => {
    const sql = "UPDATE employee SET name = ?, lastname = ?, email = ?, passsword = ?, salary = ? WHERE emp_id = ?";
    const values = [
      req.body.name,
      req.body.lastname,
      req.body.email,
      req.body.password,
      req.body.salary
    ];
    const id = req.params.emp_id;
    
    db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
export { UpdateEmployee as updateemp };