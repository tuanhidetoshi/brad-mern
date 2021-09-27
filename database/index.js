const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD
        });
        console.log("Database connected...");
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

module.exports = {
    connect
}

