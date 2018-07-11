import React,{ Component } from 'react';
import '../app.css';
import {Link} from 'react-router-dom';
import 'bulma/css/bulma.css'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import setAuthorizationToken from '../setAuthorizationToken';
import { withRouter } from "react-router-dom";

class NavigaionBar extends Component{

  handleLogout(e){
    const {setCurrentUser,history} = this.props;
    e.preventDefault();
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    setCurrentUser({})
    history.push('/signin')
  }

  render(){

    const { isAuthenticate,
            user} = this.props.auth;

    const users =(
      <div id="navbarID" className="navbar-menu">
        <div className="navbar-start">
          <Link to='/home' id="myLink1" className='navbar-item has-text-white is-size-5'>หน้าหลัก</Link>
        <a href="#" id="myLink2" className='navbar-item has-text-white is-size-5' onClick={this.handleLogout.bind(this)}>ล็อคเอ้า</a>
        </div>
      </div>
    )

    const guest =(
      <div id="navbarID" className="navbar-menu">
        <div className="navbar-start">
          <Link to='/home' id="myLink1" className='navbar-item has-text-white is-size-5'>หน้าหลัก</Link>
          <Link to='/signin' id="myLink2" className='navbar-item has-text-white is-size-5'>ล็อคอิน</Link>
        </div>
      </div>
    )

    return(
      <div>
        <nav className="navbar is-fixed-top navOpacity" id="myNavbar" >
          <div className="navbar-brand">
            <Link to='/' className='navbar-item'>
            </Link>
            <div className="navbar-burger burger is-size-1" data-target="navbarID">
              <span className="has-text-white" id="myLink3"></span>
              <span className="has-text-white" id="myLink4"></span>
              <span className="has-text-white" id="myLink5"></span>
            </div>
          </div>
          {isAuthenticate ? users : guest}
        </nav>
      </div>
    )
  }

}

NavigaionBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state)=>{
  return({
    auth: state.auth
  })
}

const mapDispatchToProps = (dispatch)=>{
  return{
    setCurrentUser:(user)=>{
      dispatch({
        type:"setCurrentUser",
        payload:user
      });
    }
  }
}
window.onscroll = function() {myFunction()};
function myFunction() {
  var navbar = document.getElementById("myNavbar");
  var link1 = document.getElementById("myLink1");
  var link2 = document.getElementById("myLink2");
  var link3 = document.getElementById("myLink3");
  var link4 = document.getElementById("myLink4");
  var link5 = document.getElementById("myLink5");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    navbar.className = "navbar" + " cardBar" + " is-fixed-top" + " has-background-white" + " animateTop";
    link1.className = "navbar-item" + " is-active" + " has-text-black" + " is-size-5"
    link2.className = "navbar-item" + " has-text-black" + " is-size-5"
    link3.className = "has-text-black"
    link4.className = "has-text-black"
    link5.className = "has-text-black"
  } else {
    navbar.className = navbar.className.replace("has-background-white", "navOpacity");
    navbar.className = navbar.className.replace("cardBar", "");
    link1.className = link1.className.replace("has-text-black","has-text-white")
    link2.className = link2.className.replace("has-text-black","has-text-white")
    link3.className = link3.className.replace("has-text-black","has-text-white")
    link4.className = link4.className.replace("has-text-black","has-text-white")
    link5.className = link5.className.replace("has-text-black","has-text-white")
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavigaionBar));
