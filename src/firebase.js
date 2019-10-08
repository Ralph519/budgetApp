import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBE8znnDAt_I_lRgw81P21uqfoLSiRCBz8",
    authDomain: "budgetapp-e1ae1.firebaseapp.com",
    databaseURL: "https://budgetapp-e1ae1.firebaseio.com",
    projectId: "budgetapp-e1ae1",
    storageBucket: "budgetapp-e1ae1.appspot.com",
    messagingSenderId: "660607590833",
    appId: "1:660607590833:web:01e28cdfd4c478be0e9d90",
    measurementId: "G-BPTVNWEYQS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const firestore = firebaseApp.firestore()

  export default firestore