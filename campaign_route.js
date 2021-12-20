const express = require('express');
const Campaign = require('../controllers/campaign_controller');
const Campaigns = require('../models/Campaign')
const multer  = require('multer')
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

router.get('/campaign' , Campaign.getallcampaign);
router.get('/campaign/:id' , Campaign.getcampaignbyid);
router.post('/campaign' ,upload.array('video' ,10), Campaign.addcampaign);
router.put('/campaign/:id' ,upload.array('video' ,10), Campaign.updatecampaign);
router.delete('/campaign/:id' , Campaign.deletecampaign);

module.exports = router;