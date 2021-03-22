import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';
import ServicePage from './component/ServicePage';
import RecommandationPage from './component/RecommandationPage';
import RecommandationDetailsPage from './component/RecommandationDetailsPage';
import RestaurationPage from './component/RestaurationPage';
import EventConfirmationPage from './component/EventConfirmationPage';
import RestaurationMenuPage from './component/RestaurationMenuPage';
import OrderPage from './component/OrderPage '
import AccountPage from './component/AccountPage'

import token from './reducers/token'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const store = createStore(combineReducers({ token }))

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={LoginPage} path="/" exact />
          <Route component={HomePage} path="/home" exact />
          <Route component={ServicePage} path="/service" exact />
          <Route component={RecommandationPage} path="/recommandation" exact />
          <Route component={RecommandationDetailsPage} path="/recommandation/:typeRecommandation/:nameRecommandation" exact />
          <Route component={EventConfirmationPage} path="/events/:_id" exact />
          <Route component={RestaurationPage} path="/restauration" exact />
          <Route component={RestaurationMenuPage} path="/restauration/:route" exact />
          <Route component={OrderPage} path="/restauration/:route/:id" exact />
          <Route component={AccountPage} path="/account" exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
