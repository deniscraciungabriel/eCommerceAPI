const mongoose = require('mongoose')
require("dotenv").config()

const connectProducts = (req, res) => {
    return mongoose.connect(process.env.MONGO_URI_PRODUCTS).then(() => { console.log("Connected to the products DB") })
}

module.exports = { connectProducts }