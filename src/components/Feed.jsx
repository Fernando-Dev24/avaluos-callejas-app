import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
import { useNavigate } from 'react-router-dom';
/* components */
import { MainHeader } from './MainHeader';
import { SearchBar } from './SearchBar';

export const Feed = ({ setTargetAvaluo, setAlertState, setAlertContent }) => {
   /* hooks */
   const { setNewAvaluo } = useNewAvaluo();
   const navigate = useNavigate();

   /* DONE: Validate if there is something on localstorage, if it is true redirect to edit avaluo component, to allow the user save this avaluo. */
   useEffect(() => {
      const storagedAvaluo = JSON.parse(localStorage.getItem('avaluo'));
      if( storagedAvaluo !== null ) {
         setNewAvaluo({ ...storagedAvaluo });
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Parece que has dejado un valúo sin guardar... :)',
         });
         navigate('/new/general');
      };
   }, []);

   return (
      <>
         <Helmet>
            <title>Avalúos Finalizadas</title>
         </Helmet>

         <MainHeader />

         <SearchBar
            setTargetAvaluo={ setTargetAvaluo }
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
         />
      </>
   );
};