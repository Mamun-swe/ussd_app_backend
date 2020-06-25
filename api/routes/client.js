
const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client/client')

router.post('/request/', clientController.clientRequest)


module.exports = router