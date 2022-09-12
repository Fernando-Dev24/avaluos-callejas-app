import React, { useState, useEffect } from 'react';
/* helpers */
import { addBase } from '../helpers/addBase';
/* assets */
import { FiXCircle } from 'react-icons/fi';

export const BaseModal = ({
   targetAvaluo,
   setTargetAvaluo,
   setAlertState,
   setAlertContent,
   setShowBaseModal
}) => {
   // props
   const { id, odometer, from, extras, transmission, cylindersProm } = targetAvaluo.content;

   /* states */
   const [base, setBase] = useState(0);

   /* handleSubmit */
   const handleSubmit = (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      // Validation
      if( isNaN(base) || base === undefined || base === '' ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Asegurate de ingresar un dato númerico a la base del vehículo',
         });
         return;
      };

      try {
         addBase(setTargetAvaluo, targetAvaluo, base);
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Base agregada con éxito',
         });
         setShowBaseModal(false);
      } catch(error) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error al agregar la base del vehículo, vuelve a intentarlo'
         });
      };
   };

   useEffect(() => {
      window.addEventListener("keydown", ({ key }) => key === 'Escape' && setShowBaseModal(false));
      return () => {
         window.addEventListener("keydown", ({ key }) => key === 'Escape' && setShowBaseModal(false));
      };
   }, [setShowBaseModal]);

   return (
      <section className="shadow-modal">
         <section className="modal expenses-modal full-width">
            <article className="car-info">
               <h3>Agregar base | { id }</h3>
               <p>Transmisión: { transmission }</p>
               <p>Kilometraje: { odometer }</p>
               <p>Cilindrada: { cylindersProm }</p>
               <p>Procedencia: { from }</p>
               <p>Extras: { extras }</p>
            </article>
            <form
               className='form'
               autoComplete='off'
               onSubmit={ handleSubmit }>
               <article className="input-field">
                  <label htmlFor="base">Valor de base</label>
                  <input
                     type="text"
                     min="0"
                     step="0.1"
                     name='base'
                     id='base'
                     placeholder='Valor de base'
                     value={ base }
                     onChange={ ({ target }) => setBase(target.value) }
                  />
               </article>
               <button
                  type='submit'
                  className='btn btn-submit'>
                  Agregar base
               </button>
            </form>
            <FiXCircle
               onClick={ () => setShowBaseModal(false) }
               className='btn btn-close-modal'
            />
         </section>
      </section>
   );
};