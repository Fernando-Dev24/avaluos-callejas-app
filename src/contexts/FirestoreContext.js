import React, { useState, useEffect, useContext } from 'react';
/* firebase */
import { db } from '../firebase/firebaseConfig';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';

/* contexts variables */
const FirestoreContext = React.createContext();

/* hooks - useFirestore will save all prices to search one of them lately */
const useFirestore = () => useContext(FirestoreContext);

/* Provider */
const FirestoreProvider = ({ children }) => {
   /* states */
   const [avaluos, setAvaluos] = useState([]);
   const [loading, setLoading] = useState(true);

   // Connect to firestore and get all data
   useEffect(() => {
      const killFirestore = onSnapshot(query(
         collection(db, 'avaluos'),
         orderBy('created', 'desc'),
      ), (snapshot) => {
         setAvaluos(snapshot.docs.map((avaluo) => {
            return { ...avaluo.data(), id: avaluo.id };
         }));
      });
      setLoading(false);
      return killFirestore;
   }, []);

   return (
      <FirestoreContext.Provider value={{ avaluos: avaluos }}>
         { !loading && children }
      </FirestoreContext.Provider>
   );
}

export { FirestoreContext, useFirestore, FirestoreProvider };