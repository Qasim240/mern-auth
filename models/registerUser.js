

const Joi = require("joi");
const mongoose = require("mongoose");

const registerUser = mongoose.model('registerUser', new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100
    }

}))

function RegisterUserVaidation(register) {
    const Schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().required(),
        password: Joi.string().max(100).min(8).required()
    })
    return Schema.validate(register)
}
exports.registerUser = registerUser;
exports.validate = RegisterUserVaidation


