const express = require("express")
const { user } = require("../models/main")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await user.create({
            email,
            password: hashedPassword,
            role: 1000
        })
    } catch (error) {
        if (error.code == 11000) {
            res.status(422).json({ mess: "There already is an account with this email" })
        }
        else {
            res.status(500).json({ mess: "Server error, try again later" })
        }
    }
    res.status(200).json({ mess: "User created successfully" })
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await user.findOne({ email }).lean()
        if (await bcrypt.compare(password, foundUser.password)) {
            const token = jwt.sign({ id: foundUser._id }, process.env.JWT, { expiresIn: "30d" })
            res.status(200).json({ mess: "Logged in", token })
        }
        else {
            res.status(403).json({ err: "Email or password are wrong" })
        }

    } catch (error) {
        res.status(500).json({ mess: "Server error, try again later" })
    }
}

const verifyRole = async (req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader ? authHeader.split(" ")[1] : null
    if (token == null) return res.status(400)
    return jwt.verify(token, process.env.JWT, async (err, userToVerify) => {
        if (err) return res.status(403).json({ mess: "Token expired or wrong" })
        const id = userToVerify.id
        const foundUser = await user.findOne({ _id: id })
        if (!foundUser) return res.status(403)
        return foundUser.role
    })
}

module.exports = { registerUser, loginUser, verifyRole }