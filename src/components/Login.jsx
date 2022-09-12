import React, { useState } from 'react';
/* firebase */
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
/* hooks */
import { useNavigate, Link } from 'react-router-dom';
/* components */
import { Alert } from '../styled-components/Alert';
/* assets */
import { ReactComponent as Logo } from '../assets/logo.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Login = () => {
   /* hooks */
   const navigate = useNavigate();

   /* states */
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [alertState, setAlertState] = useState(false);
   const [alertContent, setAlertContent] = useState({});

   /* regEx */
   const emailExpression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

   /* handleLoginState */
   const handleLoginState = ({ target }) => {
      if( target.id === 'email' ) {
         setEmail(target.value);
      } else if( target.id === 'password' ) {
         setPassword(target.value);
      };
   };

   /* handleSubmit */
   const handleSubmit = async (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});
   
      /* Validations */
      if( email === '' || email === undefined ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Ingresa un correo electronico'
         });
         return;
      };

      if( password === '' || password === undefined ) {
         setAlertState(false);
         setAlertContent({
            type: 'error',
            message: 'Ingresa la contraseña'
         });
         return;
      };

      if( !emailExpression.test(email) ) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: "Ingresa un código eléctronico válido"
         });
         return;
      };

      // If everything's ok, we login using email and password provided
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate('/');
      } catch(error) {
         setAlertState(true);
         let message;
         switch( error.code ){
            case 'auth/wrong-password':
               message = 'Contraseña incorrecta';
            break;
            case 'auth/user-not-found':
               message = 'Ningún correo coincide con el correo ingresado';
            break;
            default:
               message = 'Hubo un problema al iniciar sesión, intentelo de nuevo';
            break;
         };
         setAlertContent({
            type: 'error',
            message: message,
         });
      };
   };

   return (
      <>
         <section className='login'>
            <section className="login-form">
               <Logo className='logo' />
               <article className="login-title">
                  <span>Avalúos Callejas & Asociados</span>
                  <h3>Iniciar sesión</h3>
               </article>
               <form className="form" autoComplete='off' onSubmit={ handleSubmit }>
                  <article className="input-field">
                     <input
                        type="text"
                        name='email'
                        id='email'
                        placeholder='Correo del usuario'
                        value={ email }
                        onChange={ handleLoginState }
                     />
                  </article>
                  <article className="input-field password-field">
                     <input
                        type={ showPassword ? 'text' : 'password' }
                        name='password'
                        id='password'
                        placeholder='Contraseña'
                        value={ password }
                        onChange={ handleLoginState }
                     />
                     { !showPassword ?
                        <FiEye
                           className='input-icon'
                           onClick={ () => setShowPassword(true) }
                        />
                        :
                        <FiEyeOff
                           className='input-icon'
                           onClick={ () => setShowPassword(false) }
                        />
                     }
                  </article>
                  <button className='btn btn-submit' type='submit'>
                     Iniciar sesión
                  </button>
               </form>
               <Link
                  to="/recover-password"
                  className='btn btn-submit'>
                  Recuperar contraseña
               </Link>
            </section>
            <section className="login-image">
            </section>
         </section>

         <Alert
            type={alertContent.type}
            message={alertContent.message}
            alertState={alertState}
            setAlertState={setAlertState}
         />
      </>
   );
};