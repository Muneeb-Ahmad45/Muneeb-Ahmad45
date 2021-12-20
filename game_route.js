const express = require('express');
const Game = require('../controllers/game_controller')
const Games =require('../models/Game');

const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file , cb)=>{
        cb(null , './uploads/games')
    },
    filename:(req, file , cb)=>{
        cb(null , file.originalname)
    }
})

const upload = multer({
    storage: storage 
});
router.get('/game' , Game.getallgames)
router.get('/game/:id' , Game.getgamesbyid)
router.post('/game' ,upload.single('icon') ,Game.creategame)
router.put('/game/:id' , upload.single('icon') , Game.updategame)
router.delete('/game/:id' , Game.deletegame)



module.exports = router;