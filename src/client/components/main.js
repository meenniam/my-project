import React from 'react';
import {Switch,Route} from 'react-router-dom';
import HomePage from './homepage';
import SignIn from './signin'

const Main = ()=>(
  <div>
    <div className="">
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/home" component={HomePage}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signout" component={HomePage}/>
      <Route exact path="/signup" component={HomePage}/>
    </Switch>
    </div>
  </div>
)

export default Main;
