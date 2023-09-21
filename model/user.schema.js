const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:String,
    dob:String,
    mobile:String,
    gender:String
    
})
const UserModel = mongoose.model("Users",UserSchema)
module.exports = UserModel