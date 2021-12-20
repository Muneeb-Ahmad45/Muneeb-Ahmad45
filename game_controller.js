const Games = require('../models/Game');
const multer = require('multer');
const Users = require('../models/User');
const res = require('express/lib/response');


exports.getallgames = async (req, res, next) => {
    try {
        const result = await Games.find()
        res.status(200).json({
            status: true,
            result
        })
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};
exports.getgamesbyid = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Games.findById({ _id: id })
        res.status(200).json({
            status: true,
            result
        })
    } catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later"
        })
    }
};
exports.creategame = async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(404).send("Can not add team ")
        } else {
            let { game_name, platform, game_url } = req.body;
            if (game_name == undefined || game_name == '' || game_url == undefined || game_url == '') {
                res.status(404).send("Please provide all the required fields")
            } else {
                const game = Games.create({
                    game_name: game_name,
                    platform: platform,
                    game_url: game_url,
                    icon: req.file.path,

                    user_id: req.body.user_id
                })
                res.status(200).json({
                    status: true,
                    game_id: game.id,
                    game_name: game.game_name,
                    game_platform: game.game_platform,
                    game_url: game.game_url,
                    game_icon: game.icon,
                })
            }
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
exports.updategame = async (req, res, next) => {
    try {
        const id = req.params.id;
        const game = await Games.findById(id);
        if (game) {
            await Games.findByIdAndUpdate({ _id: id }, {
                game_name: req.body.game_name,
                platform: req.body.platform,
                game_url: req.body.game_url,
                icon: req.file.path

            })
            res.status(200).json({
                status: true,
                message: "Game Updated!!"
            })
        } else {
            res.status(200).json({
                status: false,
                message: "Game does not exist..Please Provide vilade id"
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
exports.deletegame = async (req, res, next) => {
    try {
        const id = req.params.id
        const game = await Games.findById(id)

        if (game) {
            await Games.deleteOne({ _id: id })
            res.status(200).json({
                status: true,
                message: 'game deleted'
            })

        } else {
            res.status(200).json({
                status: false,
                message: "game id does not exist"
            });
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