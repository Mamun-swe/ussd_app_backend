
const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client/client')

router.post('/request/', clientController.clientRequest)
router.get('/doctor/search', clientController.findDoctor)



module.exports = router