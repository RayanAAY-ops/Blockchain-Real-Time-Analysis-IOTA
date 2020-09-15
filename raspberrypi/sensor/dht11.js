var sensor = require("node-dht-sensor");
async function sensor_data() {

const data = sensor.read(11, 4)

	return {data}
}
module.exports = sensor_data;	
