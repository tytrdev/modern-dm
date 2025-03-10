import firebase from 'firebase/dist/index.cjs';
// import 'firebase/firestore'; // Might become useful

const config = {
  apiKey: 'AIzaSyDwnaZlbhg5cwz-kj1VgBrNEwirhXhXO5Y',
  authDomain: 'modern-dm.firebaseapp.com',
  databaseURL: 'https://modern-dm.firebaseio.com',
  projectId: 'modern-dm',
  storageBucket: 'modern-dm.appspot.com',
  messagingSenderId: '126530314322',
};

firebase.initializeApp(config);

// Firebase
export default firebase;

// Auth
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const Auth = firebase.auth();

// Schemas
export const DB = firebase.database().ref();
export const Todos = DB.child('todos');
export const Worlds = DB.child('worlds');
