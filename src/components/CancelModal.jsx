import React, { useEffect } from 'react';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helpers */
import { saveAndExit } from '../helpers/saveAndExit';
/* assets */
import { FiXCircle } from 'react-icons/fi';

export const CancelModal = ({ setShowModal, setAlertState, setAlertContent, editAvaluo, setEditAvaluo }) => {
   /* hooks */
   const navigate = useNavigate();
   const { newAvaluo, resetContext } = useNewAvaluo();
   const { plate, brand, model, applicant } = newAvaluo;

   /* functions */
   const handleSaveAndExit = async () => {
      setAlertState(false);
      setAlertContent({});

      // validation before create a new document
      if( plate === '' || plate === undefined ||
          brand === '' || brand === undefined ||
          model === '' || model === undefined
      ) {
         setAlertState(true);
         setAlertContent({
            type: "error",
            message: "Asegurate de llenar los campos: Placa, Marca, Módelo"
         });
         return;
      };

      if( applicant === '' || applicant === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Para crear el avalúo es necesario que proporciones el nombre del solicitante'
         });
         return;
      };

      // Upload this avaluo to the database
      try {
         await saveAndExit(newAvaluo, editAvaluo, setEditAvaluo);
         resetContext();
         setShowModal(false);
         localStorage.clear();
         navigate('/');
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo'
         });
      };
   };

   const handleExitWithoutSave = () => {
      resetContext()
      localStorage.clear();
      setShowModal(false);
      setEditAvaluo(false);
      navigate("/");
   };

   useEffect(() => {
      window.addEventListener("keydown", ({ key }) => key === 'Escape' && setShowModal(false));
      return () => {
         window.addEventListener("keydown", ({ key }) => key === 'Escape' && setShowModal(false));
      };
   }, [setShowModal]);
   
   return (
      <section className='shadow-modal'>
         <article className="modal half-width cancel-modal">
            <h2>¿Qué quieres hacer al salir?</h2>
            <nav className='actions-nav'>
               <button
                  className='btn btn-action recommend'
                  onClick={ handleSaveAndExit }>
                  Guardar y salir
               </button>
               <button
                  className='btn btn-action'
                  onClick={ handleExitWithoutSave }>
                  Salir sin guardar
               </button>
            </nav>
            <FiXCircle
               className='btn-icon'
               onClick={ () => setShowModal(false) }
            />
         </article>
      </section>
   );
};