import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

const firebaseConfig = {
    apiKey: "AIzaSyCK8vbymPcLDewFfHznSt8lEdgGZp4O4rk",
    authDomain: "shopping-cart-2069e.firebaseapp.com",
    databaseURL: "https://shopping-cart-2069e.firebaseio.com",
    projectId: "shopping-cart-2069e",
    storageBucket: "shopping-cart-2069e.appspot.com",
    messagingSenderId: "17139108491",
    appId: "1:17139108491:web:b7a7a301853ae0e95f228e",
    measurementId: "G-NF59H641RN"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export {db, uiConfig, firebase};