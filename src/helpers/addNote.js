/* firebase */
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore'
/* helpers */
import { getUnixTime } from 'date-fns';

export const addNote = async (desc) => {
   const newNote = {
      description: desc.trim(),
      created: getUnixTime(new Date()),
   };

   // Save note on firestore
   await addDoc(collection(db, 'notes'), newNote);
};