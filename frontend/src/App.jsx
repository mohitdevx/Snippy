import React from 'react'
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './Auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;

