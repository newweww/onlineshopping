import express from "express";
import db from "../utils/db.js";

const router = express.Router()

router.post('adminlogin', (req, res) => {
    console.log(req.body)
})

export { router as adminRouter }