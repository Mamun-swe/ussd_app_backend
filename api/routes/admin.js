const express = require("express")
const router = express.Router()
const authController = require("../controllers/admin/auth")
const doctorController = require("../controllers/admin/doctor")

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', authController.myProfile)
router.put('/logout', authController.logout)


router.post("/doctor", doctorController.createDoctor)
router.get("/doctor", doctorController.doctorsList)
router.get("/doctor/:id/view", doctorController.doctorView)
router.delete("/doctor/:id/delete", doctorController.doctorDelete)
router.put("/doctor/:id/update", doctorController.doctorUpdate)
router.get("/doctor/count", doctorController.doctorCount)

module.exports = router