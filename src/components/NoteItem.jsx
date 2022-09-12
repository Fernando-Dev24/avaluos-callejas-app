import React, { useState } from 'react';
/* firebase */
import { db } from '../firebase/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helpers */
import { updateNote } from '../helpers/updateNote';
/* assets */
import { FiEdit2, FiTrash, FiClipboard, FiCheck } from 'react-icons/fi'

export const NoteItem = ({
   note,
   noteId,
   setAlertState,
   setAlertContent,
   notes,
   hasFoundNotes,
   setHasFoundNotes,
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();

   /* props */
   const { state:foundState, found } = hasFoundNotes;

   /* states */
   const [isEdit, setIsEdit] = useState({ state: false, payload: undefined });
   const [ isNoteAdded, setIsNoteAdded ] = useState(false);

   /* handleCopy */
   const handleCopy = ({ target }) => {
      const targetId = target.id;
      const [ { description } ] = notes.filter(({ id }) => id === targetId);

      // Small validation
      if( newAvaluo.comments.length === 0 ) {
         setNewAvaluo({ ...newAvaluo, comments: newAvaluo.comments + `// ${ description } //` });
      } else {
         setNewAvaluo({ ...newAvaluo, comments: newAvaluo.comments + ` ${ description } //` });
      }
      setIsNoteAdded(true);

      // Remove added state to false when has passed 4 seconds
      setTimeout(() => {
         setIsNoteAdded(false);
      }, 4000);
   };

   /* handleEdit */
   const handleEdit = ({ target }) => {
      const targetId = target.id;
      const [ targetElement ] = notes.filter(({ id }) => id === targetId);
      setIsEdit({ state: true, payload: targetElement });
   };

   /* handleChangeDescription */
   const handleChangeDescription = ({ target }) => {
      setIsEdit({
         ...isEdit,
         payload: { ...isEdit.payload, description: target.value },
      });
   };

   /* handleUpdate */
   const handleUpdate = async (e) => {
      e.preventDefault();
      const { payload } = isEdit;

      if( payload.description === '' || payload.description === undefined ) {
         setAlertState(true);
         setAlertContent({ type: 'error', message: 'Escribe el contenido de la nota' });
         return;
      };

      try {
         await updateNote(payload);
         setIsEdit({ state: false, payload: undefined });
         setAlertState(true);
         setAlertContent({ type: 'success', message: 'Nota actualizada con éxito' });
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({ type: 'error', message: 'Hubo un error, vuelve a intentarlo' });
      };
   };

   /* handleDelete */
   const handleDelete = async ({ target }) => {
      const targetId = target.id;
      if( foundState ) {
         const restOfNotes = found.filter(({ id }) => id !== targetId);
         setHasFoundNotes({ ...hasFoundNotes, found: restOfNotes });
      };
      try {
         await deleteDoc(doc(db, 'notes', targetId));
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Nota eliminada con éxito',
         });
      } catch(error) {
         console.log(error, targetId);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };
   
   return (
      <>
         <article
            className="note-item">
            { isEdit.state ?
               <input
                  type="text"
                  name='description'
                  className='input-field'
                  placeholder='Descripción de la nota'
                  value={ isEdit.payload.description }
                  onChange={ handleChangeDescription }
                  onKeyPress={ (e) => {
                     if( e.key === 'Enter' ) {
                        handleUpdate(e);
                     };
                  } }
               />
               :
               <p>{ note }</p>
            }
            <button
               className={ isNoteAdded
                  ? 'btn btn-options added'
                  : 'btn btn-options'
               }
               id={ noteId }
               onClick={ handleCopy }>
               { isNoteAdded ?
                  <FiCheck className='btn-icon' />
                  :
                  <FiClipboard className='btn-icon' />
               }
            </button>
            <nav className="options-navbar">
               <button
                  className='btn btn-opt'
                  id={ noteId }
                  onClick={ handleEdit }>
                  <FiEdit2 className='btn-icon' />
               </button>
               <button
                  className='btn btn-opt delete'
                  id={ noteId }
                  onClick={ handleDelete }>
                  <FiTrash className='btn-icon' />
               </button>
            </nav>
         </article>
      </>
   );
};