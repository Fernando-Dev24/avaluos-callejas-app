/* firebase */
import { db } from '../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

export const updateNote = async (payload) => {
   const { id, description } = payload;

   // Save update note on firestore
   await updateDoc(doc(db, 'notes', id), {
      description: description,
   });
};