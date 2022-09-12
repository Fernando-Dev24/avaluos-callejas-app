import React, { useState, useEffect } from 'react';
/* hooks */
import { useNotes } from '../contexts/NotesContext';
/* helpers */
import { addNote } from '../helpers/addNote';
/* components */
import { NoteItem } from './NoteItem';
/* assets */
import { FiX } from 'react-icons/fi';

export const NotesModal = ({ setShowNotesModal, setAlertState, setAlertContent }) => {
   /* hooks */
   const { notes } = useNotes();

   /* states */
   const [noteDescription, setNoteDescription] = useState('');
   const [searchValue, setSearchValue] = useState('');
   const [hasFoundNotes, setHasFoundNotes] = useState({ state: false, found: undefined });

   /* handleKeyPress */
   const handleKeyPress = ({ key }) => {
      if( key === 'Escape' ) {
         setShowNotesModal(false);
      };
   };

   /* handleSearch */
   const handleSearch = (e) => {
      e.preventDefault();

      // Validations
      if( searchValue.trim() === '' || searchValue.trim() === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe alguna palabra clave para buscar la nota'
         });
         return;
      };

      /* Search on notes */
      try {
         // Look for a note that includes what user has written
         const found = notes.filter(({ description }) => description.includes(searchValue) );
         if( found.length === 0 ) {
            setAlertState(true);
            setAlertContent({ type: 'error', message: 'No se encontraron notas' });
         } else if ( found.length !== 0 ) {
            setHasFoundNotes({ state: true, found: found });
         };
      } catch (error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };
   
   /* handleSubmit */
   const handleSubmit = async (e) => {
      e.preventDefault();

      /* Validations */
      if( noteDescription === '' || noteDescription === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe la descripción de la nota'
         });
         return;
      };

      // Add note description to firestore collection: 'notes'
      try {
         await addNote(noteDescription);
         setNoteDescription('');
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Nota agregada correctamente',
         });
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };

   /* Effect that validates if there is something written on search field  */
   useEffect(() => {
      if( searchValue.trim() === '' || searchValue.trim() === undefined || searchValue.trim().length === 0 ) {
         setHasFoundNotes({ state: false, found: undefined });
      };
   }, [searchValue]);

   useEffect(() => {
      window.addEventListener("keydown", (e) => handleKeyPress(e));
      return () => {
         window.addEventListener("keydown", (e) => handleKeyPress(e));
      };
   }, []);

   return (
      <section className="shadow-modal">
         <article className={ notes.length !== 0
            ? "modal prices-modal modal-overflow"
            : 'modal prices-modal'
         }>
            <header className="modal-header form-header">
               <form className='notes-form' autoComplete='off' onSubmit={ handleSubmit }>
                  <article className="input-field">
                     <label htmlFor="noteDescription">Agregar nueva nota</label>
                     <input
                        type="text"
                        name='noteDescription'
                        id='noteDescription'
                        placeholder='Contenido de la nota'
                        value={ noteDescription }
                        onChange={ ({ target }) => setNoteDescription(target.value.toUpperCase()) }
                     />
                  </article>
               </form>
            </header>

            { notes.length !== 0 ?
               <article className='notes-grid'>
                  <article className='notes-header'>
                     <h3>Agrega, busca, edita o elimina una nota</h3>
                     <input
                        type="text"
                        name='searchNote'
                        placeholder='Buscar una nota'
                        value={ searchValue }
                        onChange={ ({ target }) => setSearchValue(target.value.toUpperCase()) }
                        onKeyPress={ (e) => {
                           if( e.key === 'Enter' ) {
                              handleSearch(e);
                           };
                        } }
                     />
                  </article>
                  { hasFoundNotes.state ?
                     hasFoundNotes.found.map(({ id, description }) => (
                        <NoteItem
                           key={ id }
                           noteId={ id }
                           note={ description }
                           notes={ notes }
                           setAlertState={ setAlertState }
                           setAlertContent={ setAlertContent }
                           hasFoundNotes={ hasFoundNotes }
                           setHasFoundNotes={ setHasFoundNotes }
                        />
                     ))
                     :
                     notes.map(({ id, description }) => (
                        <NoteItem
                           key={ id }
                           noteId={ id }
                           note={ description }
                           notes={ notes }
                           setAlertState={ setAlertState }
                           setAlertContent={ setAlertContent }
                           hasFoundNotes={ hasFoundNotes }
                           setHasFoundNotes={ setHasFoundNotes }
                        />
                     ))
                  }
               </article>
               :
               <article className="notes-empty">
                  <h2>No hay notas en la base de datos</h2>
               </article>
            }

            <FiX
               className='btn-close-modal'
               onClick={ () => setShowNotesModal(false) }
            />
         </article>
      </section>
   )
};