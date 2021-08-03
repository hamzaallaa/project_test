const express = require('express')
const userControlles = require('../controllers/user')
const router = express.Router()
router.get('/users/', userControlles.get)
router.post('/users/', userControlles.create)
router.delete('/users/:id', userControlles.delete)
router.put('/users/:id', userControlles.update)
module.exports = router
