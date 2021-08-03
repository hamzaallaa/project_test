const express = require('express')
var cors = require('cors')
const router=require('./router/route')
const app = express()
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    next()
})
app.use('/api', router)

module.exports = app