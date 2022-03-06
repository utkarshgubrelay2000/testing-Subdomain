
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config({path:"./config/config.env"});

let mongoClient=null;
class connectionModel {
    static async mongoConnect() {
   
        let client = await MongoClient.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        mongoClient=client;
    }
   static  async getClient() {
 //  console.log(mongoClient)
        return mongoClient;
    }
}

module.exports = connectionModel;