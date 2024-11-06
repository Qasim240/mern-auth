


const jwt = require("jsonwebtoken")

const config = require("config")

function authMiddleware(req, res, next) {
    // console.log(req.header)
    const token = req.header("x-auth-key");
    // console.log( {token})
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("inlavid token")
    }
}

module.exports = authMiddleware;