import express from "express";
import db from "../utils/db.js";
import convertImage from "./ConvertImage.js";
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Use the fileURLToPath and dirname functions to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AddEmployee = express();
const upload = multer({ dest: 'uploads/' });

AddEmployee.post("/", upload.single('image'), async (req, res) => {
    const { name, lastname, email, password, salary } = req.body;

    if (!name || !lastname || !email || !password || !salary || !req.file) {
        return res.status(400).json({ error: "All fields are required, and an image must be uploaded" });
    }

    try {
        const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);  // Import the path module
        const convertedImage = await convertImage(imagePath);

        const sql = "INSERT INTO employee (name, lastname, email, password, salary, image) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [name, lastname, email, password, salary, convertedImage];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            return res.json({ message: "Employee added successfully", data });
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { AddEmployee as addemployee };
