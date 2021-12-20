const express = require('express');
const Video  = require('../controllers/video_controller');
const Videos = require('../models/Video');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file , cb)=>{
        cb(null , './uploads/videos')
    },
    filename:(req, file , cb)=>{
        cb(null , file.originalname)
    }
})

const upload = multer({
    storage: storage 
});

router.get('/video' , Video.getallvideos);
router.get('/video/:id' , Video.getvideobyid);
router.post('/video',upload.array('video' , 10) , Video.addvideo);
router.put('/video/:id',upload.array('video' , 10) , Video.updatevideo);
router.delete('/video/:id' , Video.deletevideo);

module.exports = router;