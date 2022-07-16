const express = require("express")
const { product } = require("../models/main")
const { verifyRole } = require("./users")

const getStaticProducts = async (req, res) => {
    try {
        const products = await product.find({})
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
const getProducts = async (req, res) => {
    try {
        let result;
        if (req.body.name) {
            result = await product.find({ name: { $regex: req.body.name, $options: "i" } })
        }
        if (result.length < 1) {
            res.status(404).json({ mess: "no products found" })
        }
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
const postProduct = async (req, res) => {
    try {
        const role = await verifyRole(req, res)
        if (role != 3000) {
            res.status(403).json({ mess: "You don't have the permission to do this" })
        }
        const newProduct = await product.create(req.body)
        res.status(201).json({ mess: "Product created!", prod: newProduct })
    } catch (error) {
        console.error(error)
        if (error.name == "ValidationError") {
            res.status(400).json({
                mess: "Make sure you inserted all the parameters and spelled them well."
            })
        }
        res.status(500).json({ error })
    }
}
const modifyProduct = async (req, res) => {
    try {
        const role = await verifyRole(req, res)
        if (role != 3000) {
            res.status(403).json({ mess: "You don't have the permission to do this" })
        }
        const { id } = req.params
        const newProduct = await product.findOneAndUpdate({ _id: id }, req.body)

        if (!newProduct) {
            res.status(404).json({ mess: `Product by the id ${id} not found` })
        }
        res.status(200).json({
            newProduct
        })
    } catch (error) {
        res.status(500).json({
            mess: "Try again later"
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const role = await verifyRole(req, res)
        if (role != 3000) {
            res.status(403).json({ mess: "You don't have the permission to do this" })
        }
        const { id } = req.params
        const deletedProduct = await product.findOneAndDelete({ _id: id })
        res.status(200).json({
            mess: "Product deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const getSpecificProduct = async (req, res) => {
    try {
        const products = await product.findOne(req.body).exec()
        if (!products) {
            res.status(404).json({
                mess: "No products found with these specifications"
            })
        }
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getSorted = async (req, res) => {
    try {
        const { sort } = req.query
        const sortList = sort.split(",").join(" ")
        const sortedProducts = await product.find({}).sort(sortList)
        res.status(200).json({ sortedProducts })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = { getProducts, getStaticProducts, postProduct, modifyProduct, deleteProduct, getSpecificProduct, getSorted }
