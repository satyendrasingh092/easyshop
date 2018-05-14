import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import AppContainer from '../containers/AppContainer'
import ProductListContainer from "../containers/ProductListContainer";
import DetailedViewContainer from "../containers/DetailedViewContainer";


export const configureRouteForStore = (store) => {
    return (<Provider store={store}>
        <Router>
            <Route path="/" component={AppContainer}/>
        </Router>
    </Provider>)
}

/**
 * @returns {*} return route matching the url
 */
export const containerRouter = () => {
    return (
        <React.Fragment>
            <Route exact path="/" component={ProductListContainer}/>
            <Route path="/product/:productId" component={DetailedViewContainer}/>
        </React.Fragment>
    )
}