import React from 'react';
/* hooks */
import { useLocation } from 'react-router-dom';
/* components */
import { CancelModal } from './CancelModal';
import { Link } from 'react-router-dom';

export const CreateHeader = ({
   showModal,
   setShowModal,
   setAlertState,
   setAlertContent,
   editAvaluo,
   setEditAvaluo
   }) => {
   let location = useLocation();
   const { pathname } = location;

   return (
      <>
         <header className='new-header'>
            <article className="header-content container">
               <button
                  className='btn btn-cancel'
                  onClick={ () => setShowModal(true) }>
                  Regresar
               </button>
               <nav className='create-links'>
                  <Link
                     to="/new/general"
                     className={
                        pathname === "/new/general"
                        ? 'btn btn-new active'
                        : 'btn btn-new'
                     }>
                     Datos generales
                  </Link>
                  <Link
                     to="/new/aesthethic"
                     className={
                        pathname === "/new/aesthethic"
                        ? 'btn btn-new active'
                        : 'btn btn-new'
                     }>
                     Diagnóstico estético
                  </Link>
                  <Link
                     to="/new/mechanic"
                     className={
                        pathname === "/new/mechanic"
                        ? 'btn btn-new active'
                        : 'btn btn-new'
                     }>
                     Diagnóstico mecánico
                  </Link>
                  { editAvaluo &&
                     <Link
                        to="/new/car-value"
                        className={
                           pathname === "/new/car-value"
                           ? 'btn btn-new active'
                           : 'btn btn-new'
                        }>
                        Base, valor comercial y agencia
                     </Link>
                  }
                  <Link
                     to="/new/files"
                     className={
                        pathname === "/new/files"
                        ? 'btn btn-new active'
                        : 'btn btn-new'
                     }>
                     Notas
                  </Link>
               </nav>
            </article>
         </header>

         { showModal &&
            <CancelModal
               setShowModal={ setShowModal }
               setAlertState={ setAlertState }
               setAlertContent={ setAlertContent }
               editAvaluo={ editAvaluo }
               setEditAvaluo={ setEditAvaluo }
            />
         }
      </>
   );
};