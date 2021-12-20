const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose')
  

    const userSchema =  mongoose.Schema({
        full_name:{
            type: String,
            required: true
            },
        email:{
            type: String,
            required: true
            },
        password:{
            type: String,
            required: true
        },
 
       token:{
            type:String,
            
        }
        

    }, { timestamps: true })

 

    const Users =  mongoose.model('Users' , userSchema);
    module.exports = Users;