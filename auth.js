const jwt = require('jsonwebtoken');

module.exports = (req , res, next ) =>{
    
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token , process.env.TOKEN_KEY)
        next();
    }catch {
        res.send('Authorization Fail')

    }
    
    
}