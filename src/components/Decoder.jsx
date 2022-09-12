import React, { useEffect } from 'react';
/* assets */
import { FiX } from 'react-icons/fi';

export const Decoder = ({ setDecoder }) => {
   /* handleCloseDecoder */
   const handleCloseDecoder = () => {
      setDecoder({ state: false, name: null });
   };

   useEffect(() => {
      window.document.addEventListener('keydown', ({ key }) => {
         if( key === 'Escape' ) handleCloseDecoder();
      });
      
      return () => {
         window.document.addEventListener('keydown', ({ key }) => {
            if( key === 'Escape' ) handleCloseDecoder();
         });
      };
   }, []);

   return (
      <section className="shadow-modal">
         <article className="decoder-modal">
            <iframe src="https://www.salvagedb.com/" width={500} height={500} frameBorder="0" title='SalvageDb Decoder' />
            <FiX
               className='btn btn-close-modal'
               onClick={ handleCloseDecoder }
            />
         </article>
      </section>
   )
};