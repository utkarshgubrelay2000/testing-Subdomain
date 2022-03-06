
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config({path:"./config/config.env"});

class baseModel {
    
    static async mongoConnect(dbName,collectionName) {
   
        let client = await MongoClient.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        let db = client.db(dbName);
        let collection = db.collection(collectionName);
        return collection;
    }

}

module.exports = baseModel;