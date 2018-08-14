import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from './actions.js';
import Adapter from './apis/Adapter.js';

class Navbar extends Component {
  handleLogout = () => {
    Adapter.deleteToken();
    this.props.logoutUser();
  }

  render(){
    console.log('navbar', this.props);
    return (
      <div className="navbar">
        {
          this.props.userId ?
            <h4>Welcome {this.props.username}</h4>
          :
          null
        }
        {
          this.props.userId ?
          <Fragment>
            <NavLink to="/login" onClick={this.handleLogout}>Logout</NavLink>
            <NavLink to="/myschedule">schedule</NavLink>
            <NavLink to="/mymusic">mymusic</NavLink>
          </Fragment>

          :
          <Fragment>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
          </Fragment>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    username: state.username,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutCurrentUser()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
