class noteMiddleware {
    validate = (req, res, next) => {
      //check if content is present
      if (!req.body.content) {
        return res.status(400).send(
        "Note content can not be empty"
        );
      }
       else {
        next();
      }
    };
}

module.exports=new noteMiddleware();