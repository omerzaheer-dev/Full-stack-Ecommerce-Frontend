import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from "./routes/index"
import { store , persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  // </React.StrictMode>
);
reportWebVitals();
