import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
/* firebase */
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
/* components */
import { MainHeader } from './MainHeader';

export const CreateUser = ({ alertState, alertContent, setAlertState, setAlertContent }) => {
   /* states */
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   
   /* regEx */
   const emailExpression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

   /* handleState */
   const handleState = ({ target }) => {
      if( target.id === 'email' ){
         setEmail(target.value);
      } else if( target.id === 'password' ) {
         setPassword(target.value);
      }
   };

   /* handleCreate */
   const handleCreate = async (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      if( email === '' || email === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Llena el correo del usuario'
         });
         return;
      };

      if( !emailExpression.test(email) ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe un correo electronico que se válido'
         });
         return;
      };

      if( password === '' || password === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe una contraseña'
         });
         return;
      }

      try {
         await createUserWithEmailAndPassword(auth, email, password);
         setEmail("");
         setPassword("");
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Cuenta creada con éxito',
         });
      } catch(error) {
         setAlertState(true);
         let authMessage;
         switch(error.code) {
            case 'auth/invalid-password':
               authMessage = 'Contraseña incorrecta';
            break;
            case 'auth/email-already-exists':
               authMessage = 'El correo ya está en uso por otro usuario';
            break;
            case 'auth/invalid-email':
               authMessage = 'Correo electrónico invalido';
            break;
            case 'auth/weak-password':
               authMessage = 'La contraseña debe tener al menos 6 caracteres';
            break;
            default:
               authMessage = 'Hubo un error al crear el usuario intentalo de nuevo';
            break;
         }
         setAlertContent({
            type: 'error',
            message: authMessage
         });
      };
   };

   return (
      <>
         <Helmet>
            <title>Crear usuario</title>
         </Helmet>
         
         <MainHeader />

         <section className="new-wrapper">
            <article className="new container">
               <h2>Agregar usuario</h2>
               <p>
                  Para agregar un usuario no se necesita un correo propiamente de Google.
               </p>
               <form
                  className='form'
                  onSubmit={ handleCreate }>
                  <article className="input-field">
                     <label htmlFor="email">Correo eléctronico</label>
                     <input
                        type="text"
                        name='email'
                        id='email'
                        placeholder='nombre@callejas.com'
                        value={ email }
                        onChange={ handleState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="email">Contraseña</label>
                     <input
                        type="text"
                        name='password'
                        id='password'
                        placeholder='Contraseña'
                        value={ password }
                        onChange={ handleState }
                     />
                  </article>
                  <button type='submit' className='btn btn-submit'>
                     Crear usuario
                  </button>
               </form>
            </article>
         </section>
      </>
   );
};