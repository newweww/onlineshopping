import express from "express";
import db from "../utils/db.js";

const DeleteEmployee = express()

DeleteEmployee.delete("/deleteemployee/:emp_id", (req, res) => {
    const sql = "delete from employee where emp_id = ? ";
    const id = req.params.emp_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

export { DeleteEmployee as deleteemployee }; 