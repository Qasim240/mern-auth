




const express = require('express');
const { flightDetails } = require('../models/flightRecord');
const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
        const flight = await flightDetails.findByIdAndDelete(req.params.id);
        
        if (!flight) {
            return res.status(404).json({ message: "No Flight Found with the given ID" });
        }
        
        return res.status(200).json({ message: "Flight deleted successfully" }); 
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the flight" }); 
    }
});

module.exports = router;
