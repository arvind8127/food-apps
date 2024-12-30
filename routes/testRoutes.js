const express = require('express')
const { testUserController } = require('../controllers/testController')
const router = express.Router()

// router object Get post update delete
router.get('/test-user',testUserController)

module.exports = router