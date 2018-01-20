import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { RootReducer } from './reducers/RootReducer.js'

const reducerss = combineReducers({
    ...RootReducer
  });

const store = createStore(
    reducerss, null
);

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
