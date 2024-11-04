


const express = require("express");
const mongoose = require("mongoose");
const registerUser = require('./routes/registerUserRoute')
const loginUser = require("./routes/loginUserRoute")
const auth = require("./middleware/authMiddleware")
const config = require('config')
const app = express();
const cors = require("cors")


app.use(cors({
    origin: 'http://localhost:5174' 
}));





app.use(express.json());
// Connect to MongoDB
mongoose.connect("mongodb://localhost/myAuth")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));


// public Routes
app.use('/api/register', registerUser);
app.use('/api/login', loginUser);


// protected Routes
app.use(auth); 
app.get('/api/dashboard', (req, res) => {
    res.send("Welcome to the dashboard " + req.user._id);
});


if (!config.get('jwtPrivateKey')) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
}


const port = process.env.PORT || 5252;
app.listen(port, () => console.log(`Listening at ${port}...`));
