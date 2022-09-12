import React, { useState, useEffect, useCallback } from 'react';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helpers */
import numbro from 'numbro';
/* components */
import { ExpensesModal } from './ExpensesModal';
import { Alert } from '../styled-components/Alert';
import { ExpenseItem } from './ExpenseItem';
/* assets */
import { FiPlusCircle } from 'react-icons/fi';

export const Expenses = ({
   alertState,
   setAlertState,
   alertContent,
   setAlertContent
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const { expenses, totalExpenses } = newAvaluo;

   /* states */
   const [showExpensesModal, setShowExpensesModal] = useState(false);
   const [expenseToEdit, setExpenseToEdit] = useState({
      state: false,
      content: null,
   });
   const [targetIndex, setTargetIndex] = useState(0);

   /* handleTotalExpenses */
   const handleTotalExpenses = useCallback(() => {
      if( expenses.length === 0 ) {
         setNewAvaluo({
            ...newAvaluo,
            totalExpenses: numbro(0).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
         });
      } else if( expenses.length > 0 ) {
         let total = 0;
         expenses.forEach(({ price }) => {
            total += numbro.unformat(price);
         });
         setNewAvaluo({
            ...newAvaluo,
            totalExpenses: total
         });
      };
      // Save new avaluo context, every time expenses array change
      localStorage.setItem('avaluo', JSON.stringify(newAvaluo));
   }, [expenses]);

   /* useEffect - this effect will calculate total expenses to show in the UI */
   useEffect(() => {
      handleTotalExpenses();
   }, [expenses, handleTotalExpenses]);

   return (
      <>
         <section className="expenses">
            <section className="expenses-header">
               <h3>Costos</h3>
               <p>Presiona el botón "Agregar costo" para añadir un costo del reporte.</p>
               <button
                  className='btn btn-add'
                  onClick={ (e) => {
                     e.preventDefault();
                     setShowExpensesModal(true);
                  } }>
                  <FiPlusCircle className='btn-icon' />
                  Agregar costo
               </button>
            </section>
            <section className="expenses-content">
               <table className="expenses-table">
                  <thead>
                     <tr className='table-row-header'>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Editar</th>
                        <th>Importante</th>
                        <th colSpan={2}>Eliminar</th>
                     </tr>
                  </thead>
                  <tbody>
                     { expenses.length > 0 ?
                        expenses.map((expense, index) => {
                           return (
                              <ExpenseItem
                                 key={ expense.id }
                                 expense={expense}
                                 index={ index }
                                 setExpenseToEdit={ setExpenseToEdit }
                                 setTargetIndex={ setTargetIndex }
                                 setShowExpensesModal={ setShowExpensesModal }
                              />
                           );
                        })
                        :
                        <tr className="table-row-body">
                           <td
                              colSpan={5}
                              className="empty-cell">
                              No se han agregado costos todavía
                           </td>
                        </tr>
                     }
                  </tbody>
               </table>
               { expenses.length > 0 &&
                  <article className="total-expenses">
                     <p>Total costos: { numbro(totalExpenses).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</p>
                     <p>Costos ingresados: { expenses.length }</p>
                  </article>
               }
            </section>
         </section>

         { (showExpensesModal || expenseToEdit.state === true) &&
            <ExpensesModal
               setShowExpensesModal={ setShowExpensesModal }
               expenseToEdit={ expenseToEdit }
               targetIndex={ targetIndex }
               setExpenseToEdit={ setExpenseToEdit }
               setTargetIndex={ setTargetIndex }
               alertState={ alertState }
               alertContent={ alertContent }
               setAlertState={ setAlertState }
               setAlertContent={ setAlertContent }
            />
         }

         <Alert
            type={alertContent.type}
            message={alertContent.message}
            alertState={alertState}
            setAlertState={setAlertState}
         />
      </>
   );
};