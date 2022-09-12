import React, { useEffect } from 'react';
/* components */
import { SearchPart } from './SearchPart';
/* assets */
import { data } from '../data';

export const PricesModal = ({ setShowPricesModal }) => {
   useEffect(() => {
      window.addEventListener("keydown", ({ key }) => key === 'Escape'
         && setShowPricesModal(false)
      );
      
      return () => {
         window.addEventListener("keydown", ({ key }) => key === 'Escape'
            && setShowPricesModal(false)
         );
      };
   }, [setShowPricesModal]);

   return (
      <section className="shadow-modal">
         <section className="modal prices-modal modal-overflow">
            <SearchPart />
            <article className="modal-header">
               <h3>Lista de precios al recibir un vehículo</h3>
               <button
                  className='btn btn-close-modal price-button'
                  onClick={ () => setShowPricesModal(false) }>
                  Cerrar
               </button>
            </article>
            <table className='expenses-table'>
               <thead>
                  <tr className='table-row-header'>
                     <th>Descripción</th>
                     <th>SEDAN</th>
                     <th>PICKUP CABINA SENCILLA</th>
                     <th>PICKUP CABINA DOBLE</th>
                     <th>CAMIONETA</th>
                     <th>COASTER</th>
                  </tr>
               </thead>
               <tbody>
                  { data.map(({ id, description, prices }) => {
                     return (
                        <tr key={ id } className='table-row-body'>
                           <td>{ description }</td>
                           <td>{ prices.sedan }</td>
                           <td>{ prices.simplePickUp }</td>
                           <td>{ prices.doublePickUp }</td>
                           <td>{ prices.van }</td>
                           <td>{ prices.coaster }</td>
                        </tr>
                     );
                  }) }
               </tbody>
            </table>
         </section>
      </section>
   );
};