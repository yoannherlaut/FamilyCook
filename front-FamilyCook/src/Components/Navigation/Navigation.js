import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../Screens/Login';
import CreateUser from '../Screens/CreateUser';
import Home from '../Screens/Home';
import AddRecipe from '../Screens/AddRecipe';
import Recipe from '../Screens/Recipe';
import Profil from '../Screens/Profil';
import NotFound from '../Screens/NotFound';

const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/createAccount' component={CreateUser} />
        <Route path='/home' component={Home} />
        <Route path='/profil' component={Profil} />
        <Route path='/recipe/:id' component={Recipe} />
        <Route path='/addRecipe' component={AddRecipe} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Navigation;
