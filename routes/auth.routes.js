const express = require("express")
const router = express.Router()

const controller = require("../controllers/auth.controller")

router.get("/", controller.listUsers)
router.post("/signUp", controller.signup)

module.exports = router