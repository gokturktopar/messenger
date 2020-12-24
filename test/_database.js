const mongoose = require("mongoose");

const clearDb = async () => {
    const collections = await mongoose.connection.db.collections();
    // Clear mongo
    for (let collection of collections) {
      await collection.deleteMany({});
    }
}

module.exports = {
    clearDb
}