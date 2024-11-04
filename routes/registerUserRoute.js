


const { registerUser, validate } = require('../models/registerUser');
const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // Already Exists
        let user = await registerUser.findOne({ email: req.body.email })
        if (user) return res.status(403).send('User Already Exists')


        user = new registerUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'), { expiresIn: '1h' });

        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })

    } catch (ex) {
        console.error("Error:", ex);
        res.status(500).send("something went wrong");

    }
})


module.exports = router;