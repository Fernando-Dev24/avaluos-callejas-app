import React, { useEffect } from 'react';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* assets */
import { FiX } from 'react-icons/fi';

export const DifferentImport = ({ isDifferentImport, setIsDifferentImport }) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const { from } = newAvaluo;

   /* handleDifferentImport */
   const handleDifferentImport = ({ target }) => {
      setNewAvaluo({
         ...newAvaluo,
         [target.name]: target.value,
      });
   };

   useEffect(() => {
      window.addEventListener("keydown", ({ key }) => {
         if( key === 'Escape' ) setIsDifferentImport(false);
      });

      return () => {
         window.addEventListener("keydown", ({ key }) => {
            if( key === 'Escape' ) setIsDifferentImport(false);
         });
      }
   }, [setIsDifferentImport]);

   return (
      <section className="shadow-modal">
         <article className="modal half-width import-modal">
            <h2>Agregar diferente procedencia</h2>
            <input
               type="text"
               className='import-input'
               name='from'
               placeholder='Importado en: México, Corea, Alemania, Reino Unido, Japón etc.'
               value={ from }
               onChange={ handleDifferentImport }
               onKeyPress={ (e) => {
                  if( e.key === 'Enter' ) {
                     setIsDifferentImport(false);
                  };
               } }
            />
            <FiX
               className='btn btn-close-modal'
               onClick={ () => setIsDifferentImport(false) }
            />
         </article>
      </section>
   )
};