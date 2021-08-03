const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    userName:{type:String,required:true},
    registrationNumber:{type:String,required:true},
    createdDate:{type:Date,required:true},
    status: { type: String, enum: ["En validation", "Rejeté","Validé"] }
})
const User = mongoose.model('User', userschema)
module.exports =  User