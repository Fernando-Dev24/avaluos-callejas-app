import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/* Web app configuration */
const firebaseConfig = {
   apiKey: "AIzaSyBOO41eYSpICgoJAKJcA_ANCvu9SojiAYg",
   authDomain: "avaluos-callejas-app-5c45d.firebaseapp.com",
   projectId: "avaluos-callejas-app-5c45d",
   storageBucket: "avaluos-callejas-app-5c45d.appspot.com",
   messagingSenderId: "695283459598",
   appId: "1:695283459598:web:b091a0176f96640154fe5f"
};

/* Initialize App */
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };