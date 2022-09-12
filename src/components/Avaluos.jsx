import { getUnixTime } from 'date-fns';
import React, { useState, useEffect } from 'react';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../contexts/FirestoreContext';
/* helpers */
import { formatDate, formatWithoutTime, getAvaluoMonth, getAvaluoDay, formatMonth } from '../helpers/formatDate';

export const Avaluos = ({ foundAvaluos, setTargetAvaluo }) => {
   /* hooks */
   const navigate = useNavigate();
   const { avaluos } = useFirestore();

   /* props */
   const { couldFound, foundItems } = foundAvaluos;
   
   /* states */
   const [recentAvaluos, setRecentAvaluos] = useState([]);
   const [dayCounter, setDayCounter] = useState(0);
   const [monthCounter, setMonthCounter] = useState(0);
   const [matrizCounter, setMatrizCounter] = useState(0);

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

   /* Effect that will slice avaluos array to only render 20 avaluos cards */
   useEffect(() => {
      // Cut original array to only render twenty elements
      const recentArray = avaluos.slice(0, 21);
      setRecentAvaluos(recentArray);
   }, [avaluos]);

   /* DONE: Effect that will count the avalúos that has San Miguel on its type. Later we will make a algorithm to count for month. */
   useEffect(() => {
      let monthCounter = 0;
      let dayCounter = 0;
      let matrizCounter = 0;

      if( avaluos.length > 0 ) {
         avaluos.forEach((avaluo) => {
            const avaluoMonth = getAvaluoMonth(avaluo.created);
            const avaluoDay = getAvaluoDay(avaluo.created);
            
            const currentMonth = new Date().getMonth() + 1;
            const currentDay = new Date().getDate();

            // Count +1 if avaluo month is equal to currentMonth
            if( avaluo.avaluoType === 'SAN MIGUEL' && avaluoMonth === currentMonth ) {
               monthCounter++;
            };

            // Count +1 if avalúo day is equal to current day
            if( avaluo.avaluoType === 'SAN MIGUEL' && avaluoMonth === currentMonth && avaluoDay === currentDay ) {
               dayCounter++;
            };

            if( avaluoMonth === currentMonth ) {
               matrizCounter++;
            };
         });
         setMonthCounter(monthCounter);
         setDayCounter(dayCounter);
         setMatrizCounter(matrizCounter);
      }
   }, [avaluos]);

   return (
      <section className="avaluos">
         <section className="avaluos-content container">
            <header className='avaluos-header'>
               <h3>
                  { couldFound === true ?
                     <>
                        { foundItems.length > 0 &&
                           'Últimos Avalúos'
                        }
                     </>
                     :
                     <>
                        { recentAvaluos.length > 0 &&
                           'Últimos Avalúos'
                        }
                     </>
                  }
               </h3>
               { avaluos.length > 0 &&
                  <div className="avaluos-counter">
                     <p>Casa Matriz en { formatMonth(getUnixTime(new Date())) }: <strong>{ matrizCounter } avalúos</strong></p>

                     <p>San Miguel en { formatMonth(getUnixTime(new Date())) }: <strong>{ monthCounter } avalúos</strong></p>

                     <p className='first-child'>San Miguel realizados al { formatWithoutTime(getUnixTime(new Date())) }: <strong>{ dayCounter } avalúos</strong></p>
                  </div>
               }
            </header>
            { couldFound === true ?
               <>
                  { foundItems.length > 0 ?
                     <section className="avaluos-grid">
                        { foundItems.map(({
                              id,
                              plate,
                              brand,
                              model,
                              year,
                              avaluoType,
                              applicant,
                              created,
                              modified=created,
                              state
                           }) => {
                              return (
                                 <article
                                    key={ id }
                                    className="avaluo"
                                    id={ id }
                                    onClick={ handleViewAvaluo }>
                                    <h3>{ plate } { brand } { model } { year }</h3>
                                    <p>{ avaluoType }</p>
                                    <p>{ applicant }</p>
                                    <p>Creado: { formatWithoutTime(created) }</p>
                                    <p className='last-paragraph'>Última vez modificado: { formatDate(modified) }</p>
                                    <div className="state">
                                       <p>{ state }</p>
                                    </div>
                                 </article>
                              );
                        })}
                     </section>
                     :
                     <article className="empty-avaluos">
                        <h3>No se han encontrado resultados</h3>
                     </article>
                  }
               </>
               :
               <>
                  { recentAvaluos.length > 0 ?
                     <section className="avaluos-grid">
                        {
                           recentAvaluos.map(({
                              id,
                              plate,
                              brand,
                              model,
                              year,
                              avaluoType,
                              applicant,
                              created,
                              modified=created,
                              base
                           }) => {
                              return (
                                 <article
                                    key={ id }
                                    className="avaluo"
                                    id={ id }
                                    onClick={ handleViewAvaluo }>
                                    <h3>{ plate } { brand } { model } { year }</h3>
                                    <p>{ avaluoType }</p>
                                    <p>{ applicant }</p>
                                    <p>Creado: { formatWithoutTime(created) }</p>
                                    <p className='last-paragraph'>Última vez modificado: { formatDate(modified) }</p>
                                    <div className="state">
                                       <p>{ typeof base === 'undefined' ? 'PENDIENTE' : 'FINALIZADO' }</p>
                                    </div>
                                 </article>
                              );
                           })
                        }
                     </section>
                     :
                     <article className="empty-avaluos">
                        <h3>No hay avalúos en la base de datos</h3>
                     </article>
                  }
               </>
            }
         </section>
      </section>
   );
};