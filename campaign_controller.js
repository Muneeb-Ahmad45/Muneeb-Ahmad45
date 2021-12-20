const res = require('express/lib/response');
const Campaigns = require('../models/Campaign');

exports.getallcampaign = async (req, res, next) => {
    try {
        const result = await Campaigns.find()
        res.status(200).json(result)
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};
exports.getcampaignbyid = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Campaigns.findById({ _id: id })
        res.status(200).json(result)

    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};
exports.addcampaign = async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(201).send('All inputs is requird')
        } else {
            let video_obj = []
            if (req.files && req.files.length > 0) {
                video_obj = []
                for (i = 0; i < req.files.length; i++) {
                    let obj = {
                        path: req.files[i].path
                    }
                    video_obj.push(obj)

                }
            }
            const campaign = await Campaigns.create({
                facebook_app_id: req.body.facebook_app_id,
                facebook_app_secret: req.body.facebook_app_secret,
                game_analytics_andriod_app_key: req.body.game_analytics_andriod_app_key,
                game_analytics_andriod_secret: req.body.game_analytics_andriod_secret,
                game_analytics_ios_app_key: req.body.game_analytics_ios_app_key,
                game_analytics_ios_secret: req.body.game_analytics_ios_secret,
                user_id: req.body.user_id,
                video: video_obj
            })
            res.status(200).json({
                status: true,
                Added_campaign: campaign

            })
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};

exports.updatecampaign = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oldcampaign = await Campaigns.findById({ _id: id });
        if (oldcampaign) {
            video_obj = []
            for (i = 0; i < req.files.length; i++) {
                let obj = {
                    path: req.files[i].path
                }
                video_obj.push(obj)

            }
            await Campaigns.findByIdAndUpdate({ _id: id }, {
                facebook_app_id: req.body.facebook_app_id,
                facebook_app_secret: req.body.facebook_app_secret,
                game_analytics_andriod_app_key: req.body.game_analytics_andriod_app_key,
                game_analytics_andriod_secret: req.body.game_analytics_andriod_secret,
                game_analytics_ios_app_key: req.body.game_analytics_ios_app_key,
                game_analytics_ios_secret: req.body.game_analytics_ios_secret,
                video: video_obj
            })
            res.status(200).send('Campaign updated successfully');
        } else {
            res.status(201).send('Campaign Does not exist')
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};

exports.deletecampaign = async (req, res, next) => {
    try {
        const id = req.params.id;
        const old_campaign = await Campaigns.findById({ _id: id })
        if (old_campaign) {
            await Campaigns.deleteOne({ _id: id })
            res.status(200).send('Campaign deleted Successfully');

        } else {
            res.status(201).send('Campaign Does not exist');
        }
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};

