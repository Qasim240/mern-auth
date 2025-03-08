


const express = require("express");
const multer = require("multer");
const router = express.Router();

const bulkFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "bulkFileUploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now())
    }
});

const upload = multer({ bulkFileStorage: bulkFileStorage });
router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file Uploaded" });
        }
        console.log(req.file);
        req.status(200).json({ message: "file upload Successfully" })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server's Error" });
    }
})


module.exports = router;