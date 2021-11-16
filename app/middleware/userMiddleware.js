const jwt=require('../../utility/jwt');

class Middleware{
    verifyJwt=(req,res,next)=>{
        console.log("in jwt");
        let bearerToken = req.headers.authorization || req.params.token;
        console.log(bearerToken);
        if(!bearerToken){
            res.status(401).send("Unauthorized request");
        }
        else{
            jwt.verifyToken(bearerToken.split(" ")[1],(err,data)=>{
                if(err){
                    console.log(err);
                    res.status(401).send(err);
                }
                else{
                    req.body._id=data._id;
                    console.log("ut jwt");
                    next();
                }
            });
        }
    };
}

module.exports=new Middleware();