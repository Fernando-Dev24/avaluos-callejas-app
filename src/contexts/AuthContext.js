import React, { useState, useEffect, useContext } from 'react';
/* firebase */
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

/* context variables */
const AuthContext = React.createContext();

/* hook useAuth will allow know when a user is active */
const useAuth = () => useContext(AuthContext);

/* Auth Provider */
const AuthProvider = ({ children }) => {
   /* states */
   const [user, setUser] = useState({});
   const [loading, setLoading] = useState(true);

   /* Connect to firebase auth service to get data from the server */
   useEffect(() => {
      const clearAuthContext = onAuthStateChanged(auth, (user) => {
         setUser(user);
         setLoading(false);
      });
      return clearAuthContext;
   }, []);

   return (
      <AuthContext.Provider value={{ user: user }}>
         { !loading && children }
      </AuthContext.Provider>
   );
};

export { AuthContext, useAuth, AuthProvider };