const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    video:[{
        path:String
    }]
},{ timestamps: true })
const Videos = mongoose.model('Videos', videoSchema);
module.exports = Videos;