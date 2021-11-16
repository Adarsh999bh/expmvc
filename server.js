const express=require('express');

const cors=require('cors');

const dbconn=require('./config/dbConnection');

const logger=require('./config/logger');

const userRouter=require('./app/routes/userRoutes');

const noteRouter=require('./app/routes/noteRoutes');

const app=express();

app
.use(express.
    urlencoded({
        extended:false
}));

app
.use(express.json());

app.use('/user',cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}),userRouter);

app.use('/notes',cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}),noteRouter);


const server=app.listen(4000,()=>{

    dbconn.dbConnection();

    logger.info("server created")
    console.log("server created");

});

