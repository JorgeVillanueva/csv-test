const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        
        console.log("Database online.")
        
    } catch (error) {
        console.log(error)
        throw new Error("The database couldn't be initialized.")
    }
}

module.exports = {
    dbConnection
}