/* firebase */
import { db } from '../firebase/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

export const deleteAvaluo = async (id) => {
   await deleteDoc(doc(db, 'avaluos', id))
};