import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAaXI96g_Emvsb77MZwN2lDGG4agXbOLto",
  authDomain: "busybee-d3be4.firebaseapp.com",
  databaseURL: "https://busybee-d3be4.firebaseio.com",
  projectId: "busybee-d3be4",
  storageBucket: "busybee-d3be4.appspot.com",
  messagingSenderId: "614175835105"
};

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
