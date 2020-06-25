const express = require("express")
const router = express.Router()
const doctorController = require("../controllers/admin/doctor")

router.post("/doctor/create", doctorController.createDoctor)
router.get("/doctors", doctorController.doctorsList)

module.exports = router