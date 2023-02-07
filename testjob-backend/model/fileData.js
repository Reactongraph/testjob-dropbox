const mongoose= require('mongoose');
const fileSchema = new mongoose.Schema({
    ETag: {
        type: String,
        unique: true
    },
    ContentLength:{
        type: Number
    },
    ContentType:{
        type: String
    },
    fileName:{
        isFolder:{
            type: Boolean
        },
    },
    image:{
        type: String
    },
    file:{
        type: String
    },
    user_id:{
        type: String,  
    },

},)

fileSchema.set("timestamps",true)
module.exports =mongoose.model('fileData',fileSchema);