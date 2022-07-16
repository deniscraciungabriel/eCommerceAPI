const Express = require("express")
const Router = Express.Router()
const { getProducts, getStaticProducts, postProduct, modifyProduct, deleteProduct, getSpecificProduct, getSorted } = require("../controllers/products.js")
const { registerUser, loginUser } = require("../controllers/users")

//PRODUCTS
Router.get("/products/all", getStaticProducts).get("/products/search", getProducts).get("/products/sort", getSorted).get("/products/getspecific", getSpecificProduct)
Router.post("/products/add", postProduct)
Router.patch("/products/modify/:id", modifyProduct)
Router.delete("/products/delete/:id", deleteProduct)

//USERS
Router.post("/register", registerUser).post("/login", loginUser)


module.exports = Router 