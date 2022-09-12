/* firebase */
import { db } from '../firebase/firebaseConfig';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';
/* helpers */
import { getUnixTime } from 'date-fns';

export const saveAndExit = async (newValuo, editAvaluo, setEditAvaluo) => {
   if( editAvaluo === true ) {
      // Update information
      const { id } = newValuo;
      await updateDoc(doc(db, 'avaluos', id), {
         ...newValuo,
         images: [],
         created: newValuo.created,
         modified: getUnixTime(new Date()),
      });
      setEditAvaluo(false);
   } else if( editAvaluo === false ) {
      // Upload newAvaluo context to firebase
      await addDoc(collection(db, 'avaluos'), {
         ...newValuo,
         images: [],
         created: getUnixTime(new Date()),
      });
   }
};