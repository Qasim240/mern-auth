


const express = require("express");
const mongoose = require("mongoose");
const registerUser = require('./routes/registerUserRoute')
const loginUser = require("./routes/loginUserRoute")
const flightRcord = require("./routes/flightRecordRoute")
const deletFlight = require("./routes/deleteFlight")
const uploadBulkFile = require("./routes/uploadBulkFile")
const auth = require("./middleware/authMiddleware")
const updatedFlight = require("./routes/updateFlight")
const config = require('config')

const app = express();
const cors = require("cors")


app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use(express.json());
// Connect to MongoDB
mongoose.connect("mongodb+srv://muhammadqasim1014:4kExfYf1Vv9qXiDX@cluster0.8edyw.mongodb.net/mern-auth")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));


// public Routes
app.use('/api/register', registerUser);
app.use('/api/login', loginUser);
app.use('/api/flightrecord', flightRcord);
app.use('/api/deleteflight', deletFlight);
app.use('/api/updatedflight', updatedFlight);
app.use('/api/uploadBulkFile', uploadBulkFile)


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
