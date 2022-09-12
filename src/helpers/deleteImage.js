/* firebase */
import { storage } from '../firebase/firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';

export const deleteImage = (imgRef, setAlertState, setAlertContent) => {
   const fileToDeleteRef = ref(storage, imgRef);

   // Deleting object
   deleteObject(fileToDeleteRef)
      .then(() => {
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Archivo borrado correctamente'
         });
      })
      .catch((error) => {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo'
         });
      });
};