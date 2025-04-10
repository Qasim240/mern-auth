const Joi = require("joi");
const mongoose = require("mongoose");

const flightDetails = mongoose.model('flightDetails', new mongoose.Schema({
    flightName: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    returnFlight: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    stop: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        // required: true
    },
    time: {
        type: String,
        required: true
    },
    flight_class: {
        type: String,
        required: true
    },
    adult_fare: {
        type: String,
        required: true
    }

}));

function flightDetailsValidation(flightDetails) {
    const schema = Joi.object({
        flightName: Joi.string().required(),
        departure: Joi.string().required(),
        returnFlight: Joi.string().isoDate().required(),
        origin: Joi.string().required(),
        stop: Joi.string().required(),
        destination: Joi.string().required(),
        date: Joi.date(),
        time: Joi.string().required(),
        flight_class: Joi.string().required(),
        adult_fare: Joi.string().required()


    });

    return schema.validate(flightDetails);
}

exports.flightDetails = flightDetails;
exports.flightDetailsValidation = flightDetailsValidation;
