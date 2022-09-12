import React, { useState, useEffect } from 'react';
/* hooks */
import { useFirestore } from '../contexts/FirestoreContext';
/* components */
import { Link } from 'react-router-dom';
import { Avaluos } from './Avaluos';
/* assets */
import { FiPlusCircle } from 'react-icons/fi';

export const SearchBar = ({ setTargetAvaluo, setAlertState, setAlertContent }) => {
   /* hooks */
   const { avaluos } = useFirestore();

   /* states */
   const [searchValue, setSearchValue] = useState('');
   const [foundAvaluos, setFoundAvaluos] = useState({
      couldFound: false,
      foundItems: [],
   });

   /* handleSearch */
   const handleSearch = ({ target }) => {
      const upperValue = target.value;
      setSearchValue(upperValue.toUpperCase());
   };

   /* handleSubmitSearch */
   const handleSubmitSearch = (e) => {
      e.preventDefault();
      // Search on avaluos contexts if there is an avaluo id that includes what is on searchValue state
      const foundAvaluos = avaluos.filter(({ plate, brand, model, year }) => {
         const fullTitle = `${ plate } ${ brand } ${ model } ${ year }`;
         return fullTitle.includes(searchValue);
      });
      
      setFoundAvaluos({
         couldFound: true,
         foundItems: foundAvaluos,
      });

      if( foundAvaluos.length > 0 ) {
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: `Se encontraron ${ foundAvaluos.length } avaluos`,
         });
      };
   };

   /* Effect will validate search bar value to change foundAvaluos state */
   useEffect(() => {
      if( searchValue === '' || searchValue === undefined ) {
         setFoundAvaluos({ couldFound: false, foundItems: [] });
      };
   }, [searchValue]);

   return (
      <>
         <section className='search-bar container'>
            <h3>Crea, busca o selecciona un avalúo para ver su contenido</h3>
            <article className="search-bar-flex">
               <input
                  className='search-input'
                  type="text"
                  name='car'
                  placeholder='Ingresa la placa, marca, módelo, o año del vehículo'
                  value={ searchValue }
                  onChange={ handleSearch }
                  onKeyPress={ (e) => {
                     if( e.key === 'Enter' ) {
                        handleSubmitSearch(e);
                     };
                  } }
               />
               <Link to="/new/general" className='btn btn-create'>
                  <FiPlusCircle className='btn-icon' />
                  Crear un avalúo
               </Link>
            </article>
         </section>

         <Avaluos
            foundAvaluos={ foundAvaluos }
            setTargetAvaluo={ setTargetAvaluo }
         />
      </>
   );
};