const express=require('express');

const cors=require('cors');

const app=express();

app
.use(express.
    urlencoded({
        extended:false
}));

app
.use(express.json());


const server=app.listen(4000,()=>{

    console.log("server created");

})

