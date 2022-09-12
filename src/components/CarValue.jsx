import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
/* firebase */
import { db } from '../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* helpers */
import numbro from 'numbro';
/* components */
import { CreateHeader } from './CreateHeader';
import { Alert } from '../styled-components/Alert';
import { ExpensesBar } from './ExpensesBar';

export const CarValue = ({
   showModal,
   setShowModal,
   alertState,
   setAlertState,
   alertContent,
   setAlertContent,
   editAvaluo,
   setEditAvaluo
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const { plate, brand, model, year } = newAvaluo;

   /* states */
   const [editBase, setEditBase] = useState(false);

   /* handleEditBaseState */
   const handleEditBaseState = () => {
      if( editBase ) {
         // Validate if there is a value on base, if it's not then execute alert
         if( newAvaluo.base === '' || isNaN(newAvaluo.base) || newAvaluo.base === undefined ) {
            setNewAvaluo({
               ...newAvaluo,
               base: 0,
               commercialPrice: 0,
               agencyPrice: 0,
            });
            setEditBase(false);
         }
      } else {
         setEditBase(true);
      }
   };

   /* handleEditBase */
   const handleEditBase = ({ target }) => {
      const { totalExpenses } = newAvaluo;
      let expenses = Number(totalExpenses);
      let expensesPercentage = 0;
      let commercialPrice = 0;
      let agencyPrice = 0;
      let base = target.value;

      // Calculate the expenses percentage to know how many expenses the car has.
      expensesPercentage = Math.floor(( expenses / base ) * 100);

      // Make conditionals to know the exact value and if it is a max value doc or not.
      if( expensesPercentage <= 54 ) { // When expenses are less than 54%
         commercialPrice = Math.round(base - expenses);
         agencyPrice = Math.round(( base - expenses ) / 1.23);
      } else if ( expensesPercentage >= 55 && expensesPercentage <= 75 ) { // When expenses are more than 55 and less than 75
         commercialPrice = Math.round(base * 0.40);
         agencyPrice = Math.round(( base * 0.40 ) / 1.23);
      } else if ( expensesPercentage >= 76 && expensesPercentage <= 100 ) { // When expenses are more than 76 and less than 100
         commercialPrice = Math.round(base * 0.30);
         agencyPrice = Math.round(( base * 0.30 ) / 1.23);
      } else if ( expensesPercentage > 100 ) {
         commercialPrice = Math.round(base * 0.25);
         agencyPrice = Math.round(( base * 0.25 ) / 1.23);
      };

      setNewAvaluo({
         ...newAvaluo,
         base: target.value,
         expensesPercentage: expensesPercentage,
         commercialPrice: commercialPrice,
         agencyPrice: agencyPrice,
      });
   };

   /* handleDefaultValues */
   const handleDefaultValues = ({ target }) => {
      if( target.name === 'commercialPrice' ) {
         setNewAvaluo({
            ...newAvaluo,
            commercialPrice: target.value,
            agencyPrice: (target.value / 1.23).toFixed(2),
         });
      } else if( target.name === 'agencyPrice' ) {
         setNewAvaluo({
            ...newAvaluo,
            [target.name]: target.value
         });
      };
   };

   /* handleSaveNewBase */
   const handleSaveNewBase = async (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      // Validate if there is a value on input field
      if( newAvaluo.base === '' || isNaN(newAvaluo.base) || newAvaluo.base === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Ingresa la base del vehículo'
         });
         return;
      };

      if( newAvaluo.commercialPrice === '' || isNaN(newAvaluo.commercialPrice) || newAvaluo.commercialPrice === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Ingresa un valor comercial para el vehículo'
         });
         return;
      };

      if( newAvaluo.agencyPrice === '' || isNaN(newAvaluo.agencyPrice) || newAvaluo.agencyPrice === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Ingresa un valor de agencia para el vehículo'
         });
         return;
      };

      try {
         // Desestructuring id to locate the existing document id
         const { id, totalExpenses, base: avaluoBase } = newAvaluo;
         let expenses = Number(totalExpenses);
         let base = Number(avaluoBase);
         let expensesPercentage = 0;
         let commercialPrice = 0;
         let agencyPrice = 0;

         // Calculate the expenses percentage to know how many expenses the car has.
         expensesPercentage = Math.floor(( expenses / base ) * 100);

         // Make conditionals to know the exact value and if it is a max value doc or not.
         if( expensesPercentage <= 54 ) { // When expenses are less than 54%
            commercialPrice = Math.round(base - expenses);
            agencyPrice = Math.round(( base - expenses ) / 1.23);
            console.log(commercialPrice, agencyPrice);
         } else if ( expensesPercentage >= 55 && expensesPercentage <= 75 ) { // When expenses are more than 55 and less than 75
            commercialPrice = Math.round(base * 0.40);
            agencyPrice = Math.round(( base * 0.40 ) / 1.23);
         } else if ( expensesPercentage >= 76 && expensesPercentage <= 100 ) { // When expenses are more than 76 and less than 100
            commercialPrice = Math.round(base * 0.30);
            agencyPrice = Math.round(( base * 0.30 ) / 1.23);
         } else if ( expensesPercentage > 100 ) {
            commercialPrice = Math.round(base * 0.25);
            agencyPrice = Math.round(( base * 0.25 ) / 1.23);
         };

         // Creating a new avaluo object with base fields include
         const avaluoWithBase = {
            ...newAvaluo,
            expensesPercentage: expensesPercentage,
            commercialPrice: numbro(commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
            agencyPrice: numbro(agencyPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
            state: 'FINALIZADO',
         }

         // Save data on database
         await updateDoc(doc(db, 'avaluos', id), avaluoWithBase);
         setEditBase(false);
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Base actualizada con éxito',
         });
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'No se pudo guardar, vuelve a intentarlo',
         });
      };
   }

   /* handleSaveDefaultBase */
   const handleSaveDefaultBase = async (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      // Desestructuring
      const { commercialPrice, agencyPrice } = newAvaluo;

      // Validations
      if( commercialPrice === '' || isNaN(commercialPrice) || commercialPrice === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe un valor comercial para el vehículo',
         });
         return;
      };

      if( agencyPrice === '' || isNaN(agencyPrice) || agencyPrice === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe un valor de canje en agencia para el vehículo',
         });
         return;
      };

      // Upload new base and car values to database
      try {
         const { id } = newAvaluo;
         setNewAvaluo({ ...newAvaluo, state: 'FINALIZADO' });
         await updateDoc(doc(db, 'avaluos', id), { ...newAvaluo });
         setEditBase(false);
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Valores actualizados con éxito',
         });
      } catch (error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un problema vuelve a intentarlo',
         });
      };
   };

   useEffect(() => {
      if( newAvaluo.base === '' || newAvaluo.base === undefined ) {
         setNewAvaluo({
            ...newAvaluo,
            commercialPrice: 0,
            agencyPrice: 0,
         });
      }
   }, [newAvaluo.base]);

   return (
      <>
         <Helmet>
            <title>Base, valor comercial y de agencia</title>
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
            <section className="form container">
               <article className='edit-base'>
                  <p>Base para { plate } { brand } { model } { year } fue de:</p>
                  { !editBase ?
                     <h4>{ numbro(newAvaluo.base).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</h4>
                     :
                     <input
                        type="number"
                        min={ 0 }
                        className='base-input'
                        name='base'
                        placeholder={ `Base de: ${ newAvaluo.id }` }
                        value={ newAvaluo.base }
                        onChange={ handleEditBase }
                        onKeyPress={ (e) => {
                           if( e.key === 'Enter' ) handleSaveNewBase(e);
                        } }
                     />
                  }
                  <button
                     className='btn btn-edit'
                     onClick={ !editBase ? () => handleEditBaseState() : () => setEditBase(false) }>
                     { !editBase ? 'Editar base' : 'Cancelar' }
                  </button>
               </article>
               <section className='car-values'>
                  <section className="values">
                     <article className="value-container">
                        <p>Valor comercial</p>
                        { !editBase ?
                           <h4>{
                              numbro(newAvaluo.commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 })
                           }</h4>
                           :
                           <input
                              type="number"
                              min={ 0 }
                              className='base-input'
                              name='commercialPrice'
                              value={ numbro.unformat(newAvaluo.commercialPrice) }
                              onChange={ handleDefaultValues }
                              onKeyPress={ (e) => {
                                 if( e.key === 'Enter' ) handleSaveDefaultBase(e);
                              } }
                           />
                        }
                     </article>
                     <article className="value-container">
                        <p>Valor de canje en agencia</p>
                        { !editBase ?
                           <h4>{
                              numbro(newAvaluo.agencyPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 })
                           }</h4>
                           :
                           <input
                              type="number"
                              min={ 0 }
                              className='base-input'
                              name='agencyPrice'
                              value={ numbro.unformat(newAvaluo.agencyPrice) }
                              onChange={ handleDefaultValues }
                              onKeyPress={ (e) => {
                                 if( e.key === 'Enter' ) handleSaveDefaultBase(e);
                              } }
                           />
                        }
                     </article>
                  </section>
                  <ExpensesBar
                     percentage={ newAvaluo.expensesPercentage }
                  />
               </section>
            </section>
         </section>
      
         <Alert
            type={alertContent.type}
            message={alertContent.message}
            alertState={alertState}
            setAlertState={setAlertState}
         />
      </>
   )
};