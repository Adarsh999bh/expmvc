class noteMiddleware {
    validate = (req, res, next) => {
        console.log("vali");
      //check if content is present
      if (!req.body.content) {
        return res.status(400).send(
        "Note content can not be empty"
        );
      }
       else {
        console.log("ut vali");
        next();
      }
    };
}

module.exports=new noteMiddleware();