const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    game_name:{
        type: String,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    game_url:{
        type:String

    },
    icon:{
        type: String,
        required: true
    },
    
    user_id:{
        type: mongoose.Types.ObjectId
    }
},{ timestamps: true })
const Games = mongoose.model('Games' , gameSchema);
module.exports = Games;