const mongoose = require("mongoose");

const config = require("./config");

async function connectToDB(){
    await mongoose.connect(config.MONGO_URI);
    console.log("connected to DB successfully");
}

module.exports = connectToDB;