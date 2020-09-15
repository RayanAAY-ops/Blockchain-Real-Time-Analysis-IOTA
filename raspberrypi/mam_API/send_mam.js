const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
const Mam = require('@iota/mam')
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
let mamState = Mam.init(provider)

//////// CRONJOB ///////////////
let CronJob = require('cron').CronJob;
let chalk = require('chalk')
require('dotenv').config()
///////DATABASE/////////////////
const  mongodb  =require('mongodb');
const MongoClient = mongodb.MongoClient;
// Define the connection URL

const connectionURL ="mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME + ":" + process.env.MONGO_ATLAS_PW + "@" + process.env.MONGO_ATLAS_CLUSTER + ".wxedj.mongodb.net/"
const databaseName =  <database_name>//'INSERT HERE YOUR DATABASE NAME'
const test = require('assert');

////// Sensor DHT11 ////
const dht11 = require("../sensor/dht11.js");
// Publish to tangle
const   publish =  require('./publish_data')
try{
//Parse our URL corretly  useNewUrlParser ,+ callback function when connecting to the db
 MongoClient.connect(connectionURL, {useNewUrlParser: true } , (error,client) => {
    if (error) {
        return ('Unable to connect to database');
    }
	console.log(chalk.green('post data in progress....'));
    const db = client.db(databaseName)

    var job = new CronJob(' */15 * * * * *', function () {

        //Declare the object to push into data
        var obj = {
            table: []
        } 

const timestamp = new Date()

        const publishAll = async () => {
		const dht11_data = await dht11();
            const root = await publish({
		timestamp : timestamp,
                temperature:parseInt(dht11_data.data.temperature),

                humidity: parseInt(dht11_data.data.humidity)//(new Date()).toLocaleString()
		
            })

            return root
        }

// Callback used to pass data out of the fetch
        const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

        publishAll()
            .then(async root => {

                // Output asyncronously using "logData" callback function
                //await Mam.fetch(root, mode, null, logData)

                // Output syncronously once fetch is completed
                const result = await Mam.fetch(root, mode)
                //result.messages.forEach(message => console.log(trytesToAscii(message)))

                result.messages.forEach(message => obj.table.push(JSON.parse(trytesToAscii(message))))


                //console.log(obj.table[0].timestamp)
                const data = async () => {


                    const post = await db.collection('pi-messages').insertOne({
                        root: root,
			timestamp:timestamp
                    })
                    return post

                }
		    try {
                await data().then( () => console.log(chalk.green("successfully insert document to the database")));
		   console.log(root) }
		    catch(err){
			    console.log("error")
		    }
        //        console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}`);
		//console.log(chalk.yellow('information send to the Tangle'));
            })
    }, null, true, 'America/Los_Angeles')
    job.start();
})}
catch(e) {
    console.log("impossible to connect")
    console.log(e)
}

