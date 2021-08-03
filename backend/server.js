const app = require('./app')
const DB=require('./Database/DB')
require('dotenv').config()


let port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})