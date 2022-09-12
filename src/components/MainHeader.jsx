import React from 'react';
/* firebase */
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
/* hooks */
import { useLocation, useNavigate } from 'react-router-dom';
/* components */
import { Link } from 'react-router-dom';

export const MainHeader = () => {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   /* handleSignOut */
   const handleSignOut = async () => {
      try {
         await signOut(auth);
         navigate("/login");
      } catch(error) {
         console.log(error);
      };
   };

   return (
      <header className='header'>
         <article className="header-content container">
            <h2>Avalúos Callejas & Asociados</h2>
            <nav className='header-navbar'>
               <Link
                  to="/create-user"
                  className={
                     pathname === '/create-user'
                     ? 'btn btn-header active'
                     : 'btn btn-header'
                  }>
                  Crear usuario
               </Link>
               <Link
                  to='/'
                  className={
                     pathname === '/'
                     ? 'btn btn-header active'
                     : 'btn btn-header'
                  }>
                  Avalúos
               </Link>
               <Link
                  to="/waiting"
                  className={
                     pathname === '/waiting'
                     ? 'btn btn-header active'
                     : 'btn btn-header'
                  }>
                  Avalúos Pendientes
               </Link>
               <button
                  className='btn btn-header logOut'
                  onClick={ handleSignOut }>
                  Cerrar sesión
               </button>
            </nav>
         </article>
      </header>
   );
};