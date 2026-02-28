const mongoose = require("mongoose")

// For ENV
const URI = process.env.MONGOURI

const connect = async () => {
    try {

        const connection = await mongoose.connect(URI)

        if (connection) {
            console.log("database connected successfully");
        }

    } catch (error) {
        console.log(error);

    }
}

module.exports = connect