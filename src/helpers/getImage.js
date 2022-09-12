/* firebase */
import { storage } from "../firebase/firebaseConfig";
import { ref, getDownloadURL } from 'firebase/storage';

export const getImage = async (imageRef, setImgURL) => {
   const imgPath = imageRef._location.path_;
   const fileRef = ref(storage, imgPath);

   getDownloadURL(fileRef)
      .then((response) => {
         setImgURL(response);
      }).catch((error) => {
         return;
      })
};