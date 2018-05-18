const Firebase = require('firebase')

/*const firebaseApp = Firebase.initializeApp({
	apiKey: "AIzaSyA4EwFYLKERn-Axxn77cgjaiKbNjn4xTvE",
    authDomain: "iot-test-410f9.firebaseapp.com",
    databaseURL: "https://iot-test-410f9.firebaseio.com",
    projectId: "iot-test-410f9",
    storageBucket: "",
    messagingSenderId: "565529250252"
})*/

const firebaseApp = Firebase.initializeApp({
	apiKey: "AIzaSyATWHHfcHKAogol9KX5fJROKYxD7QN-D2Q",
	authDomain: "siramo-7f777.firebaseapp.com",
	databaseURL: "https://siramo-7f777.firebaseio.com",
	projectId: "siramo-7f777",
	storageBucket: "siramo-7f777.appspot.com",
	messagingSenderId: "719033106245"
});
 
const db = firebaseApp.database()
module.exports = db
