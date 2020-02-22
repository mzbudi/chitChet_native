import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDG_0DqkhyjzjymwB69sKwvqgWYDo30N-Y',
  authDomain: 'chitchet-ce7ac.firebaseapp.com',
  databaseURL: 'https://chitchet-ce7ac.firebaseio.com',
  projectId: 'chitchet-ce7ac',
  storageBucket: 'chitchet-ce7ac.appspot.com',
  messagingSenderId: '769086579102',
  appId: '1:769086579102:web:bee84cffb157e75e2c368f',
  measurementId: 'G-2C001S5CR2'
};

let appFirebase = firebase.initializeApp(firebaseConfig);
const db = appFirebase.database();
export { db, appFirebase };
