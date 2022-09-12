import React, { useState, useEffect } from 'react';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helpers */
import { addExpense } from '../helpers/addExpense';
import { editExpense } from '../helpers/editExpense';
import numbro from 'numbro';
/* assets */
import { FiXCircle } from 'react-icons/fi';

export const ExpensesModal = ({
   setShowExpensesModal,
   expenseToEdit,
   setExpenseToEdit,
   setAlertState,
   setAlertContent,
   targetIndex,
   setTargetIndex,
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();

   /* states */
   const [modalValues, setModalValues] = useState({ description: '', price: 0, });
   const { description, price } = modalValues;

   /* handleModalValues */
   const handleModalValues = ({ target }) => {
      if( expenseToEdit.state === true ) {
         const editedContent = {
            ...expenseToEdit.content,
            [target.name]: target.value
         };
         setExpenseToEdit({
            ...expenseToEdit,
            content: editedContent
         });
      } else if( !expenseToEdit.state ) {
         setModalValues({
            ...modalValues,
            [target.name]: target.value,
         });
      };
   };

   /* handleCloseModal */
   const handleCloseModal = () => {
      if( expenseToEdit.state ) {
         setExpenseToEdit({
            state: false,
            content: null,
         });
      } else if( !expenseToEdit.state ) {
         setShowExpensesModal(false);
      };
   };

   /* handleChoose */
   const handleChoose = (e) => {
      e.preventDefault();
      if( expenseToEdit.state === true ) {
         handleEditExpense(e);
      } else if( expenseToEdit.state === false ) {
         handleAddExpense(e);
      }
   };

   /* handleEditExpense */
   const handleEditExpense = (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({})

      // Update new Avaluo content
      try {
         editExpense(newAvaluo, setNewAvaluo, expenseToEdit);
         setExpenseToEdit({
            state: false,
            content: null,
         });
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Costo editado con éxito',
         });
      } catch(error) {
         setAlertState(true);
         setAlertContent({});
      };
   };

   /* handleAddExpense */
   const handleAddExpense = (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      // Validations
      if( description === '' || description === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: "Asegurate de llenar la descripción del costo"
         });
         return;
      };

      if( isNaN(price) || price === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Asegurate de poner un precio al costo',
         });
      };

      // Adding written cost to avaluo context
      try{
         addExpense(newAvaluo, setNewAvaluo, modalValues, targetIndex);
         // Format inputs
         setModalValues({ description: '', price: 0 });
         targetIndex !== 0 && setShowExpensesModal(false);
         setTargetIndex(0);
         // Alert to notify a success operation
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Costo agregado con éxito',
         });
         return;
      } catch(error) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
         return;
      };
   };

   useEffect(() => {
      window.addEventListener("keydown", ({ key }) => key === 'Escape' && handleCloseModal());
   }, []);

   return (
      <section className="shadow-modal">
         <article className='modal expenses-modal'>
            <article className="expenses-form">
               <h4>{ !expenseToEdit.state ? 'Añadir costo' : 'Editar costo' }</h4>
               <article className="input-field">
                  <label htmlFor="description">Descripción del costo</label>
                  <input
                     lang='es'
                     type="text"
                     autoFocus={true}
                     name='description'
                     id='description'
                     spellCheck="true"
                     placeholder='Descripción del costo'
                     value={
                        expenseToEdit.state === true
                        ? expenseToEdit.content.description
                        : description
                     }
                     onChange={ handleModalValues }
                     onKeyPress={ (e) => {
                        if( e.key === 'Enter' ) {
                           handleChoose(e);
                        };
                     } }
                  />
               </article>
               <article className="input-field">
                  <label htmlFor="price">Valor del costo</label>
                  <input
                     type="number"
                     min="0"
                     name='price'
                     id='price'
                     placeholder='Valor del costo'
                     value={
                        expenseToEdit.state === true
                        ? numbro.unformat(expenseToEdit.content.price)
                        : price
                     }
                     onChange={ handleModalValues }
                     onKeyPress={ (e) => {
                        if( e.key === 'Enter' ) {
                           handleChoose(e)
                        };
                     } }
                  />
               </article>
               <button
                  type='submit'
                  className='btn btn-submit'
                  onClick={ handleChoose }>
                  { expenseToEdit.state === false ? 'Agregar costo' : 'Editar costo' }
               </button>
            </article>
            <FiXCircle
               className='btn btn-close-modal'
               onClick={ handleCloseModal }
            />
         </article>
      </section>
   );
};