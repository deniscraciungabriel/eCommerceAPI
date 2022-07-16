const express = require("express")
const app = express()
const PORT = 3000
const Router = require("./routes/main.js")
const { connectProducts, connectUsers } = require("./controllers/connectDB")

app.use(express.json())

app.use("/api/v1", Router)

const start = () => {
    try {
        connectProducts()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`)
        })
    }
    catch (err) {
        console.log(err)
    }
}

start()