const mongoose=require('mongoose');
const dbconfig=require('./dbConfig');

exports.dbConnection=()=>{
    mongoose.connect(dbconfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
        //logg success connection here    
    }).catch(err => {
        //logg error here
        console.log(err);
        process.exit();
    });
}