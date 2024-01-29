const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const mongoURI = "mongodb://0.0.0.0:27017/TMS"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("MongoDB has been connected Successfully");
    })
}

module.exports = connectToMongo;