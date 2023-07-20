const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    try {
        let token = req.headers.Authorization;
        if(!token)
        {
            res.status(401).json({error:true,message:"Please enter the valid token"});
        }
        token = token.split(' ')[1];
        let decodeData = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decodeData?.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(409).json({message:"Internal Server Error"});
    }
}

module.exports = auth;