
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config({path:"./config/config.env"});
let connectionModel=require('./clientConnection')

class baseModel {
    
    static async mongoConnect(dbName,collectionName) {
   
        let client = await connectionModel.getClient();
        //console.log(client)
        let db = client.db(dbName);
        let collection = db.collection(collectionName);
        return collection;
    }

}

module.exports = baseModel;