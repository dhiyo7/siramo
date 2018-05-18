const five = require('johnny-five')
const Raspi = require('raspi-io')
const db = require('./firebase.js')
const dhtSensor = require('node-dht-sensor')
const firebase = require('firebase')

const board = new five.Board([
	{id: 'pi', io: new Raspi(), debug: true},
	{id: 'uno', port:'/dev/ttyACM0'}
])
let dummyData,
	 sensorIteration = 0
	 
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
      db.ref('/farms/17UFak7JqufG1RXUeVW30jwdfrQ2').update({
		temperature: temperature,
		humidity: humidity
	  })
  }
}
board.on('ready', function() {
	const relay = new five.Relay(10)
	const moisture = new five.Sensor('A0')
	this.repl.inject({
		relay: relay
	})
	db.ref('/farms/17UFak7JqufG1RXUeVW30jwdfrQ2').on('value', (snapshot) => {
		dummyData = snapshot.val().ready_siram
		if(dummyData == 1) {
			relay.open()
		} else {
			relay.close()
			console.log(snapshot.val().water_ratio)
			/*db.ref('/farms/17UFak7JqufG1RXUeVW30jwdfrQ2').update({
				last_siram: firebase.database.ServerValue.TIMESTAMP
			})*/
		}
	})
	
	moisture.scale(0, 100).on('change', function () {
			sensorIteration++
			if(sensorIteration == 150) {
				sensorIteration = 0
				db.ref('/farms/17UFak7JqufG1RXUeVW30jwdfrQ2').update({
						water_ratio: 100 - this.value
					})
			}
		})
		
	 if (tempSensor.initialize()) {
		tempSensor.read();

	  } else {
		console.warn('Failed to initialize sensor');
	  }
})
