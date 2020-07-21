import React from 'react';
import './App.css';
import Main from './component/Main';
import { AuthContextProvider } from './utils/AuthContext';
import ThemeProviderComponent from './utils/ThemeProvider';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ThemeProviderComponent>
          <Main />
        </ThemeProviderComponent>
      </AuthContextProvider>
    </div>
  );
}

export default App;
