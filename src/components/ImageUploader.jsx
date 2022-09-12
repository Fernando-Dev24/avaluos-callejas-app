import React, { useState, useEffect } from 'react';

export const ImageUploader = () => {
   /* states */
   const [image, setImage] = useState(null);
   const [imageURL, setImageURL] = useState(null);

   /* functions */
   const handleImages = ({ target }) => {
      const { files } = target;
      setImage(files[0]);
   };

   useEffect(() => {
      if( image !== null ) {
         const blob = new Blob(image);
         console.log(blob);
      }
   }, [ image ]);
   
   return (
      <>
         <header className='image-uploader-header'>
            <h4>Selecciona las fotografías</h4>
            <label className='file-upload' htmlFor="file">
               <input
                  type="file"
                  id="file"
                  name="images"
                  className='file-input'
                  onChange={ handleImages }
               />
               Seleccionar fotografías
            </label>
         </header>
      </>
   );
};