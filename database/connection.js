const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log("connected to database"));
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;