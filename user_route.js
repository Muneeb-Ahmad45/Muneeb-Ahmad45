const express = require('express');
const User = require('../controllers/user_controller');
const Users = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router()
router.get('/users' ,auth, User.getalluser)
router.get('/users/:id',auth,  User.getuserbyid)
router.post('/users/register'  , User.registeruser)
router.post('/users/login' , User.login)
router.put('/users/update/:id' , auth  ,User.updatepassword)
router.delete('/users/delete/:id' ,auth ,User.deleteuser)

module.exports = router;