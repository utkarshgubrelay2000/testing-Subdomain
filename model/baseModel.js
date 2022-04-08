
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config({path:"./config/config.env"});
let connectionModel=require('./clientConnection')

class baseModel {
    
    static async mongoConnect(dbName,ModelName) {
   
        let client = await connectionModel.getClient();
        //console.log(client)
        let db = client.db(dbName);
        let Model = db.Model(ModelName);
        return Model;
    }

}

module.exports = baseModel;