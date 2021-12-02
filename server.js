const express=require('express');

const cors=require('cors');

const dbconn=require('./config/dbConnection');

const logger=require('./config/logger');

const userRouter=require('./app/routes/userRoutes');

const noteRouter=require('./app/routes/noteRoutes');

const labelRouter=require('./app/routes/labelRoutes');

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

app.use('/label',labelRouter);

app.use(express.static('uploads'))

const server=app.listen(4000,()=>{

    dbconn.dbConnection();

    logger.info("server created")
    console.log("server created");

});



