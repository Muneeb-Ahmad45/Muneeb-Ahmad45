const mongoose = require('mongoose');
const campaignSchema = mongoose.Schema({
    facebook_app_id: {
        type: String,
        required: true
    },
    facebook_app_secret: {
        type: String,
        required: true
    },
    game_analytics_andriod_app_key: {
        type: String,
        required: true
    },
    game_analytics_andriod_secret: {
        type: String,
        required: true
    },
    game_analytics_ios_app_key: {
        type: String,
        required: true
    },
    game_analytics_ios_secret: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId
    },
    video: [{
        path: String
    }]
}, { timestamps: true })

const Campaigns = mongoose.model('Campaigns', campaignSchema);
module.exports = Campaigns;