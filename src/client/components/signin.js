import React,{Component} from 'react';
import '../app.css';
import 'bulma/css/bulma.css';
import axios from 'axios';
import setAuthorizationToken from '../setAuthorizationToken';
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux';
import validateInput from './validate';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Popup from 'react-popup';
const location = {
  pathname: '/home'
}

class SignIn extends Component{

  constructor(props){
    super(props)
    this.state = {
      id: "",
      password:"",
      errors:{},
      isLoading:false
    }
    this.handleID = this.handleID.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
  }

  handleID(e){
    this.setState({id: e.target.value})
  }

  handlePassword(e){
    this.setState({password: e.target.value})
  }

  isValid(){
    const {errors,isValid} = validateInput(this.state)
    if(!isValid){
      this.setState({errors})
    }

    return isValid
  }


  handleLogin = (e) => {
    e.preventDefault()
    if(this.isValid()){
      this.setState({
        errors:{},
        isLoading:true
      })
    }
    const {setCurrentUser,history} = this.props;
    const {id,password} = this.state
    if(password.length >3 && id.length>=1){
      axios.post('/api/login', {
        id: this.state.id,
        pass: this.state.password
      })
      .then(function (response) {
        if(response.data.message === "password incorrect!!"||response.data.message === "This ID does't have"){
          setCurrentUser({})
          Popup.alert(response.data.message)
        }
        else {
          const token = response.data.token
          localStorage.setItem('jwtToken', token)
          setAuthorizationToken(token)
          console.log(jwt.decode(token));
          setCurrentUser(jwt.decode(token))
          history.push(location)
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    }


  }

  render(){
    const {id,password,errors,isLoading} = this.state;

    return(
      <div className="">
        <div className="login-page">
            <div className="form">
                <h1>Login Form</h1>
                <div className="group">
                  <input type="text" value={id} error={errors.id} onChange={this.handleID} required/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>ID</label>
                  <span style={{color:'red'}}>{errors.id}</span>
                </div>

                <div className="group">
                  <input type="password" value={password} error={errors.password}  onChange={this.handlePassword} required/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Password</label>
                  <span style={{color:'red'}}>{errors.password}</span>
                </div>
                <button className="buttonAni buttonAni--ujarak buttonAni--border-thin buttonAni--text-thick" onClick={this.handleLogin}>
                  Login
                </button>
              <br/>
              <div>

              </div>
              <Popup/>
            </div>
        </div>
      </div>





    );
  }

}


const mapStateToProps = (state)=>{
  return({
    auth: state.auth,
    user: state.user
  })
}

const mapDispatchToProps = (dispatch)=>{
  return {
    setCurrentUser:(user)=>{
      dispatch({
        type:"setCurrentUser",
        payload: user
      })
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn));
