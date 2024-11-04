

const { registerUser } = require("../models/registerUser");
const express = require("express")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send("Email and password are required")

        // find user by mail
        const user = await registerUser.findOne({ email })
        if (!user) return res.status(401).send("invalid email or password")

        // find the user by password
        const validpassword = await bcrypt.compare(password, user.password)
        if (!validpassword) return res.status(400).send("invalid passwod")

        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'), { expiresIn: '1h' });

        res.status(200).send({
            message: "User login successful",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })


    } catch (ex) {
        console.log("Error:", ex)
        res.status(500).send("Internal server error");
    }
})




module.exports = router