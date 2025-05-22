import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider} from 'react-redux'
import store from './store/store.jsx'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <BrowserRouter>
    <Provider store={store}>
        <App />
        <Toaster />
    </Provider>
  </BrowserRouter>
    </StrictMode>
);