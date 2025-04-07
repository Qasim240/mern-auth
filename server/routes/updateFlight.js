const { flightDetails, flightDetailsValidation } = require("../models/flightRecord");
const express = require("express");
const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
      console.log("Received Update Request for ID:", req.params.id);
      console.log("Request Body:", req.body);
  
      const { error } = flightDetailsValidation(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedFlight = await flightDetails.findByIdAndUpdate(
        req.params.id,
        {
          flightName: req.body.flightName,
          departure: req.body.departure,
          origin: req.body.origin,
          stop: req.body.stop,
          destination: req.body.destination,
          date: req.body.date,
          time: req.body.time,
          returnFlight: req.body.returnFlight,
        },
        { new: true }
      );
  
      if (!updatedFlight) {
        return res.status(404).json({ error: 'Flight not found' });
      }
  
      res.status(200).json(updatedFlight);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

module.exports = router;
