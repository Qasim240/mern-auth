


const { flightDetails, flightDetailsValidation } = require('../models/flightRecord');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = flightDetailsValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let flight = await flightDetails.findOne({
            flightName: req.body.flightName,
            departure: req.body.departure,
            origin: req.body.origin,
            destination: req.body.destination,
            date: req.body.date,
            time: req.body.time,
            returnFlight: req.body.returnFlight
        });

        if (flight) return res.status(403).send("Flight Already Exists");

        flight = new flightDetails({
            flightName: req.body.flightName,
            departure: req.body.departure,
            origin: req.body.origin,
            destination: req.body.destination,
            date: req.body.date,
            time: req.body.time,
            returnFlight: req.body.returnFlight
        });

        await flight.save();

        res.status(201).send({
            id: flight._id,
            flightName: flight.flightName,
            departure: flight.departure,
            origin: flight.origin,
            destination: flight.destination,
            date: flight.date,
            time: flight.time,
            returnFlight: req.body.returnFlight
        });
    } catch (ex) {
        console.error("Error", ex);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;
