const express = require("express")
const app = express()
require("dotenv").config()

const connectDb = require("./config/db.config")
const authRoutes = require("./routes/auth.routes")

connectDb()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use("/api/auth", authRoutes)

app.listen(80, "127.0.0.1", () => {
    console.log("Server connected!");
})