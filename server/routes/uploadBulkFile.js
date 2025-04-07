const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const router = express.Router();
const { flightDetails, flightDetailsValidation } = require("../models/flightRecord");

// Define the directory path
const uploadDir = path.join(__dirname, "../bulkFileUploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const bulkFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: bulkFileStorage });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                let insertedFlights = [];
                let errors = [];

                for (let row of results) {
                    const { error } = flightDetailsValidation(row);
                    if (error) {
                        errors.push({ row, error: error.details[0].message });
                        continue;
                    }

                    let existingFlight = await flightDetails.findOne({
                        flightName: row.flightName,
                        departure: row.departure,
                        origin: row.origin,
                        stop: row.stop,
                        destination: row.destination,
                        date: row.date,
                        time: row.time,
                        returnFlight: row.returnFlight
                    });

                    if (!existingFlight) {
                        let newFlight = new flightDetails({
                            flightName: row.flightName,
                            departure: row.departure,
                            origin: row.origin,
                            stop: row.stop,
                            destination: row.destination,
                            date: row.date,
                            time: row.time,
                            returnFlight: row.returnFlight
                        });

                        await newFlight.save();
                        insertedFlights.push(newFlight);
                    }
                }

                // Delete the uploaded file after processing
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error("Failed to delete file:", err);
                });
                console.log(insertedFlights)
                return res.status(201).json({
                    message: "File processed successfully",

                    insertedFlights,
                    errors
                });
            });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
