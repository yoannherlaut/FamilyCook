import React from 'react';

import './App.css';

import Navigation from './Components/Navigation/Navigation';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import User from '../src/Reducers/Users.reducer';
import allRecipes from '../src/Reducers/allRecipes.reducer';

var globalReducers = combineReducers({
  User,
  allRecipes,
});

const store = createStore(globalReducers);
console.log(
  "%c Le gras c'est la vie!",
  'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
);
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
