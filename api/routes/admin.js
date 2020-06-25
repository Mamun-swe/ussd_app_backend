const express = require("express")
const router = express.Router()
const doctorController = require("../controllers/admin/doctor")

router.post("/doctor", doctorController.createDoctor)
router.get("/doctor", doctorController.doctorsList)
router.get("/doctor/:id/view", doctorController.doctorView)
router.delete("/doctor/:id/delete", doctorController.doctorDelete)
router.put("/doctor/:id/update", doctorController.doctorUpdate)

module.exports = router