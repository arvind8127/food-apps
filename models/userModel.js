const mongoose = require('mongoose')


// schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    phone:{
        type:String,
        required:[true, 'phone is required']
    },
    address:{
        type:Array,
    }
},{timestamps:true})


module.exports = mongoose.model('User', userSchema);