const jwt=require('../../utility/jwt');

class Middleware{
    verifyJwt=(req,res,next)=>{
        let bearerToken = req.headers.authorization || req.params.token;
        if(!bearerToken){
            res.status(401).send("Unauthorized request");
        }
        else{
            jwt.verifyToken(bearerToken.split(" ")[1],(err,data)=>{
                if(err){
                    res.status(401).send(err);
                }
                else{
                    req.body._id=data._id;
                    next();
                }
            });
        }
    };
}

module.exports=new Middleware();