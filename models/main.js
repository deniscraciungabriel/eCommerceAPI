const mongoose = require("mongoose")
const { Schema } = mongoose
require("dotenv").config()
const connUsers = mongoose.createConnection(process.env.MONGO_URI_USERS, () => { console.log("Connected to Users Database") })

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    }
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number
    }
})

const product = mongoose.model("Product", productSchema)
const user = connUsers.model("User", userSchema)

module.exports = { product, user }