var express = require('express');
require('dotenv').config()

var router = express.Router();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL ="mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME+ ":" + process.env.MONGO_ATLAS_PW
+ "@" + process.env.MONGO_ATLAS_CLUSTER + ".wxedj.mongodb.net/"
const databaseName = 'atlas-test'           //'sensors-data'
let temperature = [];
let humidity= [];
let timestamp = [];
///////////     IOTA    ///////////////
const provider = 'https://nodes.devnet.iota.org'
const Mam = require('@iota/mam')
const mode = 'public'

const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
let mamState = Mam.init(provider) // mamState is very IMPORTANT TO FETCH DATA
const { _, trytesToAscii } = require('@iota/converter')
//Import the mongoose module
const fetch_data = require("../db/fetch_data.js")
const data =async () => {
    const sensor_data = await fetch_data();
    temperature = sensor_data.temperature;
    humidity = sensor_data.humidity;
    timestamp = sensor_data.timestamp;

}
data();
router.get('/temperature', ChartJS_temperature )
 async function ChartJS_temperature (req,res) { 
  try {

  console.log(timestamp,temperature);
  res.render('dashboard/temperature', { 

    temperature_data: JSON.stringify(temperature),
    timestamp_data: JSON.stringify(timestamp)
   })
  }
  catch(error) {
    console.log(error)
  }

router.get('/humidity', ChartJS_humidity );

 }
 async function ChartJS_humidity (req,res) { 
  try {

  console.log(timestamp,humidity);
  res.render('dashboard/humidity', { 

    humidity_data: JSON.stringify(humidity),
    timestamp_data: JSON.stringify(timestamp)
   })
  }
  catch(error) {
    console.log(error)
  }
 }

  
 module.exports = router;


