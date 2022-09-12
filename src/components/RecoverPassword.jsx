import React, { useState } from 'react';
/* firebase */
import { auth } from '../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
/* components */
import { Link } from 'react-router-dom';

export const RecoverPassword = ({ setAlertState, setAlertContent }) => {
   /* states */
   const [email, setEmail] = useState('');

   /* handleEmail */
   const handleEmail = ({ target }) => {
      setEmail(target.value);
   };

   /* handleSubmit */
   const handleSubmit = async (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      // Validate if an email is on input
      if( email === '' || email === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Escribe un correo electrónico del usuario'
         });
      };

      try {
         await sendPasswordResetEmail(auth, email);
         setEmail('');
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Correo electronico de recuperación enviado'
         });
      } catch(error) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };

   return (
      <section className='recover-container'>
         <article className="recover-modal">
            <article className="recover-header">
               <h3>Recuperar contraseña</h3>
               <Link to="/login" className='btn btn-back'>Volver</Link>
            </article>
            <form className='form' autoComplete='off' onSubmit={ handleSubmit }>
               <article className="input-field">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                     type="text"
                     name='email'
                     id='email'
                     placeholder='Corre electrónico del usuario'
                     value={ email }
                     onChange={ handleEmail }
                  />
               </article>
               <button className='btn btn-submit' type='submit'>
                  Enviar correo electrónico de recuperación
               </button>
            </form>
         </article>
      </section>
   )
};