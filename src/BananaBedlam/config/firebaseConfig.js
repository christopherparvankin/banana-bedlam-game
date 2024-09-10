import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBH7crPV8xzkD8w_V51Wg4sD14XUFiviAE",
    authDomain: "fs-test-bd669.firebaseapp.com",
    projectId: "fs-test-bd669",
    storageBucket: "fs-test-bd669.appspot.com",
    messagingSenderId: "1001596368869",
    appId: "1:1001596368869:web:1cccf5bbec250820e2210c",
    measurementId: "G-R92NDLLEJN"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 
