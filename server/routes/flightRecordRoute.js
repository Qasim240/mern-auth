


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
            stop: req.body.stop,
            destination: req.body.destination,
            date: req.body.date,
            date: req.body.date,
            returnFlight: req.body.returnFlight,
            flight_class: req.body.flight_class,
            adult_fare: req.body.adult_fare,
            child_fare: req.body.child_fare,
            infant_fare: req.body.infant_fare
        });

        if (flight) return res.status(403).send("Flight Already Exists");

        flight = new flightDetails({
            flightName: req.body.flightName,
            departure: req.body.departure,
            origin: req.body.origin,
            stop: req.body.stop,
            destination: req.body.destination,
            date: req.body.date,
            date: req.body.date,
            returnFlight: req.body.returnFlight,
            flight_class: req.body.flight_class,
            adult_fare: req.body.adult_fare,
            child_fare: req.body.child_fare,
            infant_fare: req.body.infant_fare
        });

        await flight.save();

        res.status(201).send({
            id: flight._id,
            flightName: flight.flightName,
            departure: flight.departure,
            origin: flight.origin,
            stop: req.body.stop,
            destination: flight.destination,
            date: flight.date,
            date: flight.date,
            returnFlight: req.body.returnFlight,
            flight_class: req.body.flight_class,
            adult_fare: req.body.adult_fare,
            child_fare: req.body.child_fare,
            infant_fare: req.body.infant_fare
        });
    } catch (ex) {
        console.error("Error", ex);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;
