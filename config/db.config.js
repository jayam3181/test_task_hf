const mongoose = require("mongoose")

const connectDb  =async () => {
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/testTask")
        if(db){
            console.log("DB connected!");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb