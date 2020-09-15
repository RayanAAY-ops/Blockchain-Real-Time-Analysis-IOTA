var express = require('express');
var router = express.Router();
require('dotenv').config()
/////////// MONGODB /////////////
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL ="mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME+ ":" + process.env.MONGO_ATLAS_PW
+ "@" + process.env.MONGO_ATLAS_CLUSTER + ".wxedj.mongodb.net/"
const databaseName = 'atlas-test'           //'sensors-data'

///////////  GLOBAL VARIABLES ///////////
let timestamp= [];

let temperature = [];

let humidity = [];

let root ;
///////////     IOTA    ///////////////
const provider = 'https://nodes.devnet.iota.org'
const Mam = require('@iota/mam')
const mode = 'public'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
let mamState = Mam.init(provider) // mamState is very IMPORTANT TO FETCH DATA
const { _, trytesToAscii } = require('@iota/converter')


async function getData(){
    return  new Promise (function(resolve, reject) {
        MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {

            if (error) {
                return console.log('Unable to connect to database!')
            }
            const db = client.db(databaseName)



             db.collection('pi-messages').findOne({}, {sort: {$natural: -1}}, (err, data) => {
                //x.push(data.root);
                root = data.root;


                //y.push(data.mode) mode is always public
                resolve(root);

            })

        })
    })
}
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

 async function main() {

     try {

         const root = await getData();
        // await Mam.fetch(root, mode, null, logData)
        console.log("root is ",root)
         const result = await Mam.fetch(root, 'public')

     console.log("my result is " ,result)
         console.log()
         //console.log("THE PROBLEM IS  HERE")

         const message = await JSON.parse(trytesToAscii(result.messages[0].toString()))
         //console.log("THE PROBLEM IS NOT HERE")
         /*console.log("temperature is ",message.message)
         temperature = message.message
         console.log("temperature +1 is",message.message+1)
         temperature1=message.message+1 */
         await timestamp.push(message.timestamp)

         await temperature.push(message.temperature)
         await humidity.push(message.humidity)
         console.log("temperature",timestamp)

         console.log("temperature",temperature)
         console.log("humidity",humidity)

     }
      catch (error) {
             console.log(error);
     }
     //setTimeout(main,30000)
     /*callBackString.temperature = temperature;
     callBackString.temperature1 = temperature1
       //return data;
     callback(callBackString);    
     ;*/
     setTimeout(main,15000)
     return {timestamp,temperature,humidity};

 }
 
module.exports = main;