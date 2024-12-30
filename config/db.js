const mongoose = require('mongoose')


// mongodb databaseconnection
const connectDb = async () =>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to db ')
    }
    catch(error){
        console.log("DB Error", error);
    }
}
module.exports = connectDb;