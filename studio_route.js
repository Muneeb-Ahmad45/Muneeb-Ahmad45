const express = require('express');
const Studio = require('../models/Studio');
const Studios = require('../controllers/studio_controller');

const router = express.Router();

router.get('/studio' , Studios.getallstudio);
router.get('/studio/:id' , Studios.getstudiobyid);
router.post('/studio' , Studios.createstudio);
router.put('/studio/:id', Studios.updatestudio);
router.delete('/studio/:id' , Studios.deletestudio);

module.exports = router;