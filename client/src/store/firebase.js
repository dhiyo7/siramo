import firebase from 'firebase'

const config = {
apiKey: "AIzaSyATWHHfcHKAogol9KX5fJROKYxD7QN-D2Q",
authDomain: "siramo-7f777.firebaseapp.com",
databaseURL: "https://siramo-7f777.firebaseio.com",
projectId: "siramo-7f777",
storageBucket: "siramo-7f777.appspot.com",
messagingSenderId: "719033106245"
}

firebase.initializeApp(config)
export const db = firebase.database()
export const User = firebase.auth()
