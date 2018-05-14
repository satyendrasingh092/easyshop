import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {configureRouteForStore} from "./src/configs/RouteConf";
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import AppReducer from "./src/reducers/AppReducer";
window.React = React

const store = createStore(AppReducer,applyMiddleware(thunk))
const routeConfig = configureRouteForStore(store)
ReactDOM.render(routeConfig, document.getElementById('root'));

