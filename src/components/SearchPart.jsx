import React, { useState, useEffect } from 'react';
/* assets */
import { data } from '../data';

export const SearchPart = () => {
   /* states */
   const [searchValue, setSearchValue] = useState('');
   const [results, setResults] = useState({ state: false, content: null });

   /* handleSearch */
   const handleSearch = ({ target }) => {
      const value = target.value.toUpperCase();
      setSearchValue(value);
   };

   /* handleSubmit */
   const handleSubmit = (e) => {
      e.preventDefault();

      // Search on data local base if exist a expense with the given search value
      const foundExpenses = data.filter(({ description }) => description.includes(searchValue));
      // Update results states
      if( foundExpenses.length > 0 ) {
         setResults({ state: true, content: foundExpenses });
      } else if ( foundExpenses.length === 0 ) {
         setResults({ state: true, content: null });
      };
   };

   /* Effect that validates if search value is a empy string */
   useEffect(() => {
      if( searchValue === '' ) {
         setResults({ state: false, content: null });
      }
   }, [searchValue]);

   return (
      <section className="search-part">
         <form className='search-part-form' onSubmit={ handleSubmit }>
            <input
               type="text"
               name='part'
               placeholder='Ingresa el nombre del componente a buscar'
               value={ searchValue }
               onChange={ handleSearch }
            />
         </form>
         { results.state === true &&
            <article className="search-results">
               { results.content !== null ?
                  <table className='results-table'>
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
                        { results.content.map(({ id, description, prices }) => {
                           return (
                              <tr key={ id } className="table-row-body">
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
                  :
                  <div className="empty-results">
                     <h3>No se han encontrado resultados</h3>
                  </div>
               }
            </article>
         }
      </section>
   );
};