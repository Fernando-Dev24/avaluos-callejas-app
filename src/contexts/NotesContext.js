import React, { useState, useEffect, useContext } from "react";
/* firebase */
import { db } from '../firebase/firebaseConfig';
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";

/* Initialize App */
const NotesExpenses = React.createContext();

/* Custom hook to use notes expenses */
const useNotes = () => useContext(NotesExpenses);

/* Provider */
const NotesProvider = ({ children }) => {
   /* states */
   const [notes, setNotes] = useState([]);
   const [loading, setLoading] = useState(true);

   /* Effect that will get all notes in firestore */
   useEffect(() => {
      const killEffect = onSnapshot(query(
         collection(db, 'notes'),
         orderBy('created', 'desc'),
      ), (snapshot) => {
         setNotes(snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
         }));
      });
      setLoading(false);
      return killEffect;
   }, []);

   return (
      <NotesExpenses.Provider value={{ notes: notes, setNotes: setNotes }}>
         { !loading && children }
      </NotesExpenses.Provider>
   );
};

export { useNotes, NotesProvider };