import React from 'react';
import ReactDOM from 'react-dom/client';
/* contexts */
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NewAvaluoProvider } from './contexts/NewAvaluoContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
/* components */
import { AvaluosApp } from './AvaluosApp';
/* styles */
import './scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthProvider>
      <FirestoreProvider>
        <NewAvaluoProvider>
          <AvaluosApp />
        </NewAvaluoProvider>
      </FirestoreProvider>
    </AuthProvider>
  </HashRouter>
);