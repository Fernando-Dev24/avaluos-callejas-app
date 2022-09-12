import React, { useState, useEffect } from 'react';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helper */
import _ from 'lodash';
/* assets */
import { FiSave, FiCheck } from 'react-icons/fi';

export const SaveProgress = ({ setAlertState, setAlertContent }) => {
   /* hooks */
   const { newAvaluo } = useNewAvaluo();

   /* states */
   const [isDifferent, setIsDifferent] = useState(true);

   /* handleSaveProgress */
   const handleSaveProgress = () => {
      // DONE: Need to save the new avaluo context on localstorage
      try {
         localStorage.setItem('avaluo', JSON.stringify(newAvaluo));
         setIsDifferent(false);
      } catch (error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };

   /* Effect that will validate if the new avaluo context object is the same as the one that is on localstorage */
   useEffect(() => {
      if( !isDifferent ) {
         const storagedAvaluo = JSON.parse(localStorage.getItem('avaluo'));
         const isEqual = _.isEqual(newAvaluo, storagedAvaluo);
         if( storagedAvaluo !== null && !isEqual ) {
            // DONE: Need to compare the new avaluo with storagedAvaluo object
            setIsDifferent(true);
         };
      }
   }, [newAvaluo]);

   return (
      <button
         className={ isDifferent ? 'btn btn-save' : 'btn btn-save saved' }
         onClick={ handleSaveProgress }>
         { isDifferent ?
            <FiSave className='btn-icon' />
            :
            <FiCheck className='btn-icon' />
         }
      </button>
   );
};