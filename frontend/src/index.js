import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Root from './components/Root';
import './index.css';
import rootReducer from './reducers';
import { fetchAuthenticated } from './actions/account'; 

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

store.dispatch(fetchAuthenticated()).then(
    () => {
        render(
            <Provider store = {store}>
                <Root />
            </Provider>,
            document.getElementById('root'));
    }
)
