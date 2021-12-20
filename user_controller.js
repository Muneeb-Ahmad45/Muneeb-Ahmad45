const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Studio = require('../models/Studio');
require("dotenv").config();
exports.getalluser = async (req, res , next) => {
    try{
       const result =  await Users.find()
       if(result){
        res.status(200).json({
            status: true,
            result
        })
    }
        }
    catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later" 
        })
    }
};
exports.getuserbyid = async (req, res, next) => {
try{
    const id = req.params.id;

   const result =  await Users.findOne({ _id: id })
        if(result){
            res.status(200).json({
                status: true,
                result
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
exports.registeruser = async (req, res, next) => {
    // console.log(process.env.EXPIRES_IN);
    try {
        const olduser = await Users.findOne({ email: req.body.email })
        if (olduser) {
            res.status(409).send('email exist.. Please login')
        } else {
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await Users.create({
                full_name:req.body.full_name,
                email: req.body.email,
                password: encryptedPassword,
                
            });
            console.log(user.id)
            if (user.id) {
                await Studio.create({
                    studio_name:req.body.studio_name,
                    app_store_page:req.body.app_store_page,
                    team_size:req.body.team_size,
                    country: req.body.country,
                    user_id: user.id
                })
                const token = jwt.sign(
                    { user_id: user._id, email: user.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.EXPIRES_IN,
                    }
                );
                user.token = token;
                res.status(200).json({
                    user_id: user.id,
                    token,
                    user_email: user.email 
                })
            }else{
                res.status(200).json({
                    status: false,
                    message: "Error while signing up" 
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
exports.login = async (req, res , next) => {
    try{
        console.log(req.body);
        let user = await Users.findOne({ email: req.body.email })

    if (user) {
        let isMatch = await bcrypt.compare(req.body.password, user.password)
        if (isMatch) {
            const token = jwt.sign(
                { user_id: user._id, email: user.email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.EXPIRES_IN,
                }
            );
            user.token = token;
            const use = {
                email: user.email,
                user_id: user.id,

                token: user.token
            }
            res.status(200).json({
                status: true,
                user_id: user.id,
                email: user.email
            })
        } else {
            res.status(200).json({
                status: false,
                message: "Enter Correct Password"
            })
        }
    } else {
        res.status(200).json({
            status: false,
            message: "Enter Correct Email.."
        })
    }
    }catch (err) {
        next(err)
        console.log(err.message)
        res.status(200).json({
            status: false,
            message: "Something went wrong please try again later" 
        })
    } 



};
exports.updatepassword = async (req, res , next) => {
   try{
    let id = req.params.id
    let user = await Users.findById(id)

    if (user) {
        let isMatch = await bcrypt.compare(req.body.currentpassword, user.password)
        if (isMatch) {
            bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    Users.findByIdAndUpdate({ id }, {
                        full_name:req.body.full_name,
                        password: hash
                    })
                    res.send('Password Updated Successfully')
                }
            })

        } else {
            res.send('Current Password Does not Match')
        }
    }
   }catch (err) {
    next(err)
    console.log(err.message)
    res.status(200).json({
        status: false,
        message: "Something went wrong please try again later" 
    })
} 

   
};
exports.deleteuser = async (req, res , next) => {
    try{
    const id = req.params.id;
    await Users.findOneAndDelete({ _id: id })
    res.status(200).json({
        status: true,
        message: "User Deleted Successfully" 
    })
    
}catch (err) {
    next(err)
    console.log(err.message)
    res.status(200).json({
        status: false,
        message: "Something went wrong please try again later" 
    })
}
};
