const mongoose = require('mongoose');
const config = require('../config/config');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

module.exports =  {
   
    connect: function(){
        return new Promise((reslove, reject)=>{
            mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function (err) {
                if(err){
                    reject(err)
                }
                reslove();
            });
        })
    },

    //used by testing 
    mockConnect: function(){
        return new Promise(async (reslove, reject)=>{
            mongoServer = new MongoMemoryServer();
            const mongoUri = await mongoServer.getUri();
            mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function (err) {
                if(err){
                    reject(err)
                }
                reslove();
            });
        })
    },

    close: function(){
        return mongoose.disconnect();
    }
} 