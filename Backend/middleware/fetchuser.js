const jwt = require('jsonwebtoken');
const jwtSecret="HelloThisisRockySingh"

const fetchuser=(req,res,next)=>{
    // get the user from jwt token and add id to req object

    const token=req.header('auth-token')
    if(!token)
    {
        res.status(401).send({error:"please authenticate using correct token"})
    }
    try {
        const data=jwt.verify(token,jwtSecret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using correct token"})
    }
}
module.exports=fetchuser;