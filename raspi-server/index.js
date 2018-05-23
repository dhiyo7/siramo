const five = require('johnny-five')
const Raspi = require('raspi-io')
const db = require('./firebase.js')
const dhtSensor = require('node-dht-sensor')
const firebase = require('firebase')

const board = new five.Board([
	{id: 'pi', io: new Raspi(), debug: true},
	{id: 'uno', port:'/dev/ttyACM0'}
])
let readySiram,
	 waterLevel,
	 minWaterRatio,
	 maxWaterRatio,
	 automaticMode,
	 sensorIteration = 0,
	 sensorWaterIteration = 0
	 
var tempSensor = {
  initialize: function() {
    return dhtSensor.initialize(11, 4);
  },
  read: function() {
    var readOut = dhtSensor.read();
    var temperature = readOut.temperature.toFixed(2);
    var humidity = readOut.humidity.toFixed(2)
    //console.log('Temperature: ' + temperature + 'C, ' +
            //'humidity: ' + humidity + '%');
    // return readOut;
    setTimeout(function(){
      tempSensor.read();
    }, 5000)
      db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
		temperature: temperature,
		humidity: humidity
	  })
  }
}
board.on('ready', function() {
	const relay = new five.Relay(10)
	const moisture = new five.Sensor('A0')
	const waterLevelSensor = new five.Sensor('A1')
	this.repl.inject({
		relay: relay
	})
	db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').on('value', (snapshot) => {
		readySiram = snapshot.val().ready_siram
		waterLevel = snapshot.val().water_level
		minWaterRatio = snapshot.val().minWaterRatio
		maxWaterRatio = snapshot.val().maxWaterRatio
		waterRatio = snapshot.val().water_ratio
		automaticMode = snapshot.val().automaticMode
		if(readySiram == 1) {
			relay.close()
			if(waterRatio > maxWaterRatio && automaticMode == true) {
				db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
					ready_siram: 0
				})
			}
		} else {
			relay.open()
		}
	})
	
	moisture.scale(0, 100).on('change', function () {
			sensorIteration++
			if(sensorIteration == 30) {
				sensorIteration = 0
				db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
						water_ratio: 100 - this.value
					})
			}
		})
	
	waterLevelSensor.scale(0, 100).on('change', function () {
			sensorWaterIteration++
			if(sensorWaterIteration == 30){
				sensorWaterIteration = 0
				db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
					water_level: this.value
				})
			}
			
		})
	 if (tempSensor.initialize()) {
		tempSensor.read();

	  } else {
		console.warn('Failed to initialize sensor');
	  }
})
