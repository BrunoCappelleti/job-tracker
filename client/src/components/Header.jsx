import React from 'react';
import LoginForm from './LoginForm'
import { withRouter } from 'react-router';

//need to set up all conditional renders for header

const Header = (props) => (
  <div className="header">
    <h1>Tracker</h1>
    <LoginForm
      handleLogin={props.handleLogin} />
  </div>
)

export default withRouter(Header);
