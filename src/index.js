import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from "react-intl";
import { BrowserRouter } from 'react-router-dom';

//redux
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

//styling
import './index.scss';
import { MuiThemeProvider } from "@material-ui/core/styles";

import HotelTheme from "./assets/sharedassets/hotelTheme.js";
const sagaMiddleware = createSagaMiddleware();

//debugging tools for redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = process.env.NODE_ENV === 'development' ?
    createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware))):
    createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const Application = () => (

        <IntlProvider locale='en'>
            <Provider store={store}>
                <MuiThemeProvider theme={HotelTheme}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
        </IntlProvider>
)
ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
