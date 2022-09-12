import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
/* contexts */
import { NotesProvider } from '../contexts/NotesContext';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helpers */
import { saveAndExit } from '../helpers/saveAndExit';
/* components */
import { CreateHeader } from './CreateHeader';
import { NotesModal } from './NotesModal';
import { SaveProgress } from './SaveProgress';

export const FileUploader = ({
   showModal,
   setShowModal,
   setAlertState,
   setAlertContent,
   editAvaluo,
   setEditAvaluo
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo, resetContext } = useNewAvaluo();
   const { comments, plate, brand, model, applicant } = newAvaluo;
   const navigate = useNavigate();

   /* states */
   const [showSureModal, setShowSureModal] = useState(false);
   const [showNotesModal, setShowNotesModal] = useState(false);

   /* handleComments */
   const handleComments = ({ target }) => {
      setNewAvaluo({
         ...newAvaluo,
         comments: target.value
      });
   };

   /* handleShowSureModal */
   const handleShowSureModal = (e) => {
      e.preventDefault();
      setShowSureModal(true);
   };

   /* handleNotSure */
   const handleNotSure = (e) => {
      setShowSureModal(false);
   };

   /* handleUploadAvaluo */
   const handleUploadAvaluo = async () => {
      setAlertState(false);
      setAlertContent({});

      // Validations
      if( plate === '' || plate === undefined ||
         brand === '' || brand === undefined ||
         model === '' || model === undefined
      ) {
         setAlertState(true);
         setAlertContent({
         type: 'error',
         message: 'Asegurate de llenar los campos: Placa, Marca, Módelo',
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

      // Upload new Avaluo to firestores store
      try {
         await saveAndExit(newAvaluo, editAvaluo, setEditAvaluo);
         resetContext();
         localStorage.clear();
         navigate("/");
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: "error",
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };

   useEffect(() => {
      window.addEventListener("keydown", ({ key }) => key === 'Escape' && handleNotSure());
      return () => {
         window.addEventListener("keydown", ({ key }) => key === 'Escape' && handleNotSure());
      }
   }, []);

   return (
      <>
         <Helmet>
            <title>Nuevo avalúo | Imágenes y Comentarios</title>
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
            <form className='form container' spellCheck="true">
               <article className="form-title no-margin">
                  <h3>Notas</h3>
                  <div className="search-buttons">
                     <button
                        className='btn btn-option'
                        onClick={ (e) => {
                           e.preventDefault();
                           setShowNotesModal(true);
                        }  }>
                        Ver Notas
                     </button>
                  </div>
               </article>
               <article className="input-grid one-grid">
                  <article className="input-field input-increase-height comments-height">
                     <label htmlFor="comments">Notas</label>
                     <textarea
                        name="comments"
                        id="comments"
                        lang='es'
                        spellCheck="true"
                        placeholder='Escribe las notas que aparecen en el reporte'
                        value={ comments }
                        onChange={ handleComments }
                     />
                  </article>
               </article>
               <button
                  className='btn btn-submit'
                  onClick={ handleShowSureModal }>
                  { editAvaluo === true ? 'Editar avalúo' : 'Agregar avalúo' }
               </button>
            </form>
         </section>

         { showSureModal &&
            <section className="shadow-modal">
               <article className="sure-modal">
                  <h2>Asegurate de comprobar lo siguiente antes de guardar el Avalúo</h2>
                  <p>
                  ASEGURATE DE COMPROBAR: <strong>PROCEDENCIA DEL VEHICULO || NÚMERO DE MOTOR, CHASIS, Y VIN || BUSCAR EL AUTO EN
                  AUTOCHECK Y SALVAGEDB || COMPRESIONES DE MOTOR || VERIFICAR SUMA TOTAL DE COSTOS</strong>
                  </p>
                  <nav className='modal-options'>
                     <button
                        className='btn btn-option'
                        onClick={ handleUploadAvaluo }>
                        Sí, he hecho todo lo anterior
                     </button>
                     <button
                        className='btn btn-option recommend'
                        onClick={ handleNotSure }>
                        No, dejame revisar el informe
                     </button>
                  </nav>
               </article>
            </section>
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

         <SaveProgress
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
         />
      </>
   );
};