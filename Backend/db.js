const mongoose = require('mongoose');

async function connectToMongo() {
    await mongoose.connect('mongodb://0.0.0.0:27017/inotebook');
    console.log('Connected to MongoDB');
    // Continue with your code after successful connection
}


module.exports = connectToMongo;