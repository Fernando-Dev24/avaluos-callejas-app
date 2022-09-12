import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../contexts/FirestoreContext';
/* helpers */
import { formatDate } from '../helpers/formatDate';
/* components */
import { MainHeader } from './MainHeader';

export const Waiting = ({ setTargetAvaluo }) => {
   /* hooks */
   const { avaluos } = useFirestore();
   const navigate = useNavigate();

   /* states */
   const [waitingAvaluo, setWaitingAvaluo] = useState([]);

   /* handleViewAvaluo */
   const handleViewAvaluo = ({ target }) => {
      // Getting target element
      const [ targetItem ] = avaluos.filter(({ id }) => id === target.id);
      try {
         setTargetAvaluo({
            isSomething: true,
            content: targetItem
         });
         navigate(`/avaluo/${target.id}`);
      } catch(error) {
         console.log(error);
      };
   };

   /* Effect that will get all avaluos that does not have a base entry, therefore if will be undefined */
   useEffect(() => {
      const foundItems = avaluos.filter((todo) => todo.base === undefined);
      setWaitingAvaluo(foundItems);
   }, [avaluos]);

   return (
      <>
         <Helmet>
            <title>Avalúos Pendientes</title>
         </Helmet>
         
         <MainHeader />

         <section className={ waitingAvaluo.length === 0 ? 'avaluos full-height' : 'avaluos' }>
            <section className="avaluos-content container">
               <h3>Avalúos Pendientes</h3>
               { waitingAvaluo.length > 0 ?
                  <section className="avaluos-grid">
                     {waitingAvaluo.map(({
                        id,
                        plate,
                        brand,
                        model,
                        year,
                        applicant,
                        created,
                        base,
                     }) => {
                        return (
                           <article
                              key={ id }
                              className="avaluo"
                              id={ id }
                              onClick={ handleViewAvaluo }>
                              <h3>{ plate } { brand } { model } { year }</h3>
                              <p>{ applicant }</p>
                              <p className='last-paragraph'>Creado en: { formatDate(created) }</p>
                              <div className="state">
                                 <p>{ typeof base === 'undefined' ? 'PENDIENTE' : 'FINALIZADO' }</p>
                              </div>
                           </article>
                        );
                     })}
                  </section>
                  :
                  <article className="empty-avaluos">
                     <h3>No hay avalúos pendientes</h3>
                  </article>
               }
            </section>
         </section>
      </>
   );
};