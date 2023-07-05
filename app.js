const express = require("express");
const mongoose = require("mongoose");
const app = express();

const clientRouter = require('./Routes/clientRoute')

app.use(express.json());

app.use('/client', clientRouter)

require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.URL;

const connection = mongoose.connect(URL, { useNewUrlParser: true });
connection.then(() => {
    console.log("connection!");
}).catch((error) => {
    console.log('error');
})


app.listen(PORT, () => {
    console.log("listning to 3000");
})