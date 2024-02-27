import express from "express";
import db from "../utils/db.js";
import multer from "multer";
import path from "path";

const employee = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');

employee.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

employee.post('/addemployee', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error uploading file" });
        }

        const sql = "INSERT INTO employee \
                    (`name`, `lastname`, `email`, `password`, `salary` , `image`) \
                    VALUES (?, ?, ?, ?, ?, ?)";
        const sql2 = "INSERT INTO admin \
                    (`email`, `password`) \
                    VALUES (?, ?)";
        const values = [
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.body.password,
            req.body.salary,
            req.file.filename
        ];
        const values2 = [
            req.body.email,
            req.body.password
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error inserting employee data" });
            }
            db.query(sql2, values2, (err2, data2) => {
                if (err2) {
                    return res.status(500).json({ error: "Error inserting admin data" });
                }
                return res.json({ success: true });
            });
        });
    });
});

employee.delete("/deleteemployee/:emp_id", (req, res) => {
    const sql = "delete from employee where emp_id = ? ";
    const id = req.params.emp_id
    db.query(sql,[id] , (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
  })

employee.get("/getemployeefromemail/:email", (req, res) => {
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

employee.get("/getemployeebyid/:emp_id", (req, res) => {
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
  
employee.put("/updateemployee/:emp_id", (req, res) => {
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
      db.query(employeeUpdateSql, [...employeeValues, req.params.emp_id], (employeeErr, employeeData) => {
        if (employeeErr) {
          db.rollback(() => {
            return res.json(employeeErr);
          });
        }
        db.query(adminUpdateSql, adminValues, (adminErr, adminData) => {
          if (adminErr) {
            db.rollback(() => {
              return res.json(adminErr);
            });
          }
          db.commit((commitErr) => {
            if (commitErr) {
              db.rollback(() => {
                return res.json(commitErr);
              });
            }
            return res.json({ success: true });
          });
        });
      });
    });
  });

export { employee }; 