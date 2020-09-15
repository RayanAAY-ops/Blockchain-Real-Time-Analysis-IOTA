
# IOTA-MAM_Cold-Chain-Monitoring
This is a Blockchain Application based on IOTA Masked Authenticated Messaging API , to monitor sensor data delivered by embedded system.

# The problem :

Today, more and more frauds related to non-compliance with the cold chain are identified through the high number of food poisoning and deaths each year.
In France alone, according to the Revue de la santé Publique, there are 2.2 million cases of food poisoning per year, including 17,000 hospitalizations and more than 200 deaths annually.

Breaking this chain therefore involves risks.In fact, the rise in temperature may lead to the proliferation of certain germs (salmonella, staphylococcus aureus, listeria monocytogens, etc.) and then render the product unfit for consumption.

# My Solution :
In order to remedy this lack of transparency and respect for health protocols on the part of the parties concerned, a solution to the problem has been devised:

Using the IOTA Tangle to our advantage by adapting a decentralized, secure but also reliable solution, dedicated specifically to connected objects, and which does not require fees as in other networks.
<br></br>
<img src="./img/project.png">
<img align="right"  src="./img/humidity.png">
<img align="left"  src="./img/temperature.png">


## Getting Started :
```
# The easiest way to get started is to clone the repository:
git clone https://github.com/RayanAAY-ops/IOTA-MAM-cold_chain_monitoring.git myapp
```
### Mongodb ATLAS :
I used mongodb ATLAS to store root data related to my sensor data ,you have to configure your details in both directory :

```
nodejs-application/.env 
raspberrypi/.env
```
And fill it with your credentials:
```
MONGO_ATLAS_USERNAME = my_username
MONGO_ATLAS_PW=   my_password
MONGO_ATLAS_CLUSTER=  my_cluster
```

Or connect it to a local Mongodb Database.


### RaspberryPI :
Copy the rapsberrypi folder to your PI and connect to it:
```
scp -r myapp/raspberrypi/ pi@<ip_address>:/home/pi
ssh pi@<ip_address>
```

I used a pi 3 with 2GB of RAM connected with DTH11 Sensor through  ```GPIO 4```
<br></br>
<img src="./img/dht11-pi.png">

```
# First update your pi
sudo apt-get update

# Change directory to raspberrypi
cd ~/pi/raspberrypi 

# Install NPM dependencies for raspberrypi 
npm install 

# Send data to the Tangle
node mam_API/send_mam.js
```
### nodejs-application :

On your local machine ,run :
```
# Change directory to nodejsapplication 
cd myapp/nodejs-application  

# Install NPM dependencies for nodejs-application 
npm install

# Then simply start your app
npm start

you can check website will be up and running on localhost at 3000 port.
http://localhost:3000
```

## Prerequisites : 

you need to install following software 
1)	Nodejs https://nodejs.org/en/download/
2)	Express setup in nodejs application using pug template
3)	Mongodb
5)	IOTA  MAM API https://iota.org/


## Project Structure :
### nodejsapplication :
Name | Description
-- | --
bin/ | create server and normalize port
db/ | Mongodb connection + IOTA MAM Fetch
fetch_data.js | fetch sensor data using root stored in mongodb ATLAS 
public/ | Static assets (css, img etc)
public/styleshees/style.css | Main stylesheet for your app
routes/ | controller for different routes
routes/charts.js | controller for display line charts  
routes/index.js | controller for navigation bar
views/ | Templates
views/dashboard | Dashboard related templates
views/dashbaord/temperature.pug | Display line chart
views/dashbaord/humidity.pug | Display line chart
views/partials/about.pug | About page(rendering test)
views/error.pug |  Template for error messages
views/partials/navbar.pug | Navbar partial template.
views/layout.pug | Base template.
app.js | The main application file.

### raspberrypi :
Name | Description
-- | --
mam_API/ | POST request to the tangle-chain and Mongodb ATLAS  
send_mam.js | send real time sensor data to the tangle and Mongodb ATLAS
sensors/ | sensors scripts  repository 
dht11.js | asynchronous function piped to the send_mam.js file

### environment file :
Name | Description
-- | --
.env | configuration file for environment variables

## Authors :

* [Rayane AIT ALI YAHIA](https://github.com/RayanAAY-ops)

## License :

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://www.chartjs.org/
* https://www.mongodb.com
* https://nodejs.org/en/
* https://pugjs.org/
* https://www.iota.org
* https://www.expressjs.com



 
 
 
 
 

