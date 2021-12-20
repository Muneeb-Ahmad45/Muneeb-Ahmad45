const mongoose = require('mongoose')

const studioSchema = mongoose.Schema({
    studio_name:{
        type: String,
        required: true
    },
    app_store_page:{
        type: String,
        required:true
    
    },
    team_size:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    user_id:{
        type: mongoose.Types.ObjectId
       
    }
}, { timestamps: true })
const Studio = mongoose.model('Studio' , studioSchema);
module.exports = Studio;