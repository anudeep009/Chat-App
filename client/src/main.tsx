import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserContextProvider } from './context/UserContext.tsx'
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);