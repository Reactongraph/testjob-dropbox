const mongoose= require('mongoose');
const fileData= require('./fileData')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },

    lastName:{
        type: String,
    },

    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    files:{
        type: Array,
        ref: fileData
    },
    token: {
        type: String,
    },
},)

userSchema.set("timestamps",true)
module.exports =mongoose.model('User',userSchema);