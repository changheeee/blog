import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'
import { applyMiddleware } from 'redux';
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createStore } from 'redux';
import Reducer from './_renders';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
