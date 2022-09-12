import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
/* contexts */
import { NotesProvider } from '../contexts/NotesContext';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* components */
import { CreateHeader } from './CreateHeader';
import { Expenses } from './Expenses';
import { PricesModal } from './PricesModal';
import { NotesModal } from './NotesModal';
import { SaveProgress } from './SaveProgress';

export const Aesthethic = ({
   showModal,
   setShowModal,
   alertState,
   alertContent,
   setAlertContent,
   setAlertState,
   editAvaluo,
   setEditAvaluo
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const { extras } = newAvaluo;
   const navigate = useNavigate();

   /* states */
   const [showPricesModal, setShowPricesModal] = useState(false);
   const [showNotesModal, setShowNotesModal] = useState(false);

   /* handleExtrasChange */
   const handleExtrasChange = ({ target }) => {
      setNewAvaluo({
         ...newAvaluo,
         [target.name]: target.value
      });
   };

   /* handleSubmit */
   const handleSubmit = (e) => {
      e.preventDefault();

      // Update document information on firebase
      try {
         setNewAvaluo({ ...newAvaluo });
         navigate("/new/mechanic");
      } catch(error) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un problema, intentalo de nuevo'
         });
      };
   };

   return (
      <>
         <Helmet>
            <title>Nuevo avalúo | Diagnóstico estético</title>
         </Helmet>
         <CreateHeader
            showModal={ showModal }
            setShowModal={ setShowModal }
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
            editAvaluo={ editAvaluo }
            setEditAvaluo={ setEditAvaluo }
         />
         <section className="form-container">
            <form
               className="form container container"
               spellCheck="true"
               autoComplete='on'
               onSubmit={ handleSubmit }>
               <article className="form-title">
                  <h3>Diagnóstico general</h3>
                  <div className="search-buttons">
                     <button
                        className='btn btn-option'
                        onClick={ (e) => {
                           e.preventDefault();
                           setShowPricesModal(true);
                        } }>
                        Costos al recibir un vehículo
                     </button>
                     <button
                        className='btn btn-option'
                        onClick={ (e) => {
                           e.preventDefault();
                           setShowNotesModal(true);
                        } }>
                        Ver Notas
                     </button>
                  </div>
               </article>
               <article className="input-field input-increase-height">
                  <label htmlFor="extras">Extras del vehículo</label>
                  <textarea
                     name="extras"
                     id="extras"
                     lang='es'
                     spellCheck="true"
                     placeholder='Extras de la unidad'
                     value={ extras }
                     onChange={ handleExtrasChange }
                  />
               </article>

               <Expenses
                  alertState={ alertState }
                  alertContent={ alertContent }
                  setAlertState={ setAlertState }
                  setAlertContent={ setAlertContent }
               />
               
               <button
                  type='submit'
                  className="btn btn-submit">
                  Guardar y continuar
               </button>
            </form>

            { showPricesModal &&
               <PricesModal
                  setShowPricesModal={ setShowPricesModal }
               />
            }

            { showNotesModal &&
               <NotesProvider>
                  <NotesModal
                     setShowNotesModal={ setShowNotesModal }
                     setAlertState={ setAlertState }
                     setAlertContent={ setAlertContent }
                  />
               </NotesProvider>
            }
         </section>

         <SaveProgress
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
         />
      </>
   );
};