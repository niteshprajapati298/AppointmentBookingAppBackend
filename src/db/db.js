const mongoose = require('mongoose');


const DB_Connect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
}
module.exports = DB_Connect;