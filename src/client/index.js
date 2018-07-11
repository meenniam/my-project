import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import setAuthorizationToken from './setAuthorizationToken';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import {SET_CURRENT_USER} from './action/type';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import 'w3-css/w3.css';

const initialState ={
  isAuthenticate:false,
  user:{}
}

const authReducer = (state=initialState,action)=>{
  switch (action.type) {
    case 'setCurrentUser':
        state={
          user:state.user,
          isAuthenticate: !isEmpty(action.payload),
          user: action.payload
        }
      break;
      default:
  }
  return state
}
const userReducer = (state={name:""},action)=>{
  switch (action.type) {
    case 'setName':
        state={
          name: state.name,
          name: action.payload
        }
      break;
    default:

  }
  return state

}

const store = createStore(combineReducers({user:userReducer,auth:authReducer}),window.devToolsExtension ? window.devToolsExtension():f=>f)

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch({
    type: "setCurrentUser",
    payload: jwt.decode(localStorage.jwtToken)
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        $target.classList.add('navOpacity');

      });
    });
  }
