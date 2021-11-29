const express=require('express');

const cors=require('cors');

const dbconn=require('./config/dbConnection');

const logger=require('./config/logger');

const userRouter=require('./app/routes/userRoutes');

const noteRouter=require('./app/routes/noteRoutes');

const multer=require('multer');

const path=require('path')

const middleware=require('./app/middleware/userMiddleware');

const storage=multer.diskStorage({
    destination:'./uploads/images/',
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
})

const upload=multer({
    storage:storage,
}).single('image');

const app=express();

app
.use(express.
    urlencoded({
        extended:false
}));

app
.use(express.json());
app.use(cors())

app.use('/user',userRouter);

app.use('/notes',noteRouter);


app.post('/upload-image',
middleware.verifyJwt,
(req,res)=>{
    upload(req,res, err => {
        if(err){
            res.status(400).send(err);
        }
        else{
            console.log(req.file);
            res.status(200).send(req.file)
        }
    })
})

app.use(express.static('uploads'))

const server=app.listen(4000,()=>{

    dbconn.dbConnection();

    logger.info("server created")
    console.log("server created");

});



