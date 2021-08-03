const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DB.split('<password>')
DB.splice(1, 0, process.env.DB_PASSWORD)
mongoose.connect(DB.join(''), { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connectrd to MongoDBb...'))
    .catch(err => console.log('could not connect to MongoDBb....', err));