import express from "express";
import db from "../utils/db.js";

const UpdateEmployee = express();

UpdateEmployee.put("/updateemployee/:emp_id", (req, res) => {
  const employeeUpdateSql = "UPDATE employee SET name = ?, lastname = ?, email = ?, password = ?, salary = ? WHERE emp_id = ?";
  const adminUpdateSql = "UPDATE admin SET email = ?, password = ? WHERE emp_id = ?";

  const employeeValues = [
    req.body.name,
    req.body.lastname,
    req.body.email,
    req.body.password,
    req.body.salary
  ];

  const adminValues = [
    req.body.email,
    req.body.password,
    req.params.emp_id
  ];

  db.beginTransaction((err) => {
    if (err) {
      return res.json(err);
    }

    // Update employee table
    db.query(employeeUpdateSql, [...employeeValues, req.params.emp_id], (employeeErr, employeeData) => {
      if (employeeErr) {
        db.rollback(() => {
          return res.json(employeeErr);
        });
      }

      // Update admin table
      db.query(adminUpdateSql, adminValues, (adminErr, adminData) => {
        if (adminErr) {
          db.rollback(() => {
            return res.json(adminErr);
          });
        }

        // Commit the transaction if both updates are successful
        db.commit((commitErr) => {
          if (commitErr) {
            db.rollback(() => {
              return res.json(commitErr);
            });
          }

          // Send success response
          return res.json({ success: true });
        });
      });
    });
  });
});

export { UpdateEmployee as updateemp };