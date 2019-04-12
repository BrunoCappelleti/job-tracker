import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { withRouter } from 'react-router';
import jwtDecode from 'jwt-decode';
import { registerUser, loginUser } from './services/apiHelper';

//need to decided how best to conditional render using token (state vs local storage)
//fix componentDidMount
//fix handleRegister
//fix handleLogin

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      token: '',
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    //should check for token in local storage
    //if token present, should set user using token and redirect to jobs page
    const token = localStorage.getItem('trackrToken');
    if(token) {
      const data = jwtDecode(token);
      this.setState({
        user: data,
        token: token,
      });
    }
  }

  async handleRegister(data) {
    //need to set state based on user created
    //maybe do api call in the forms for better error msgs
    const resp = await registerUser(data);

    console.log(resp);
    //decide if redirect to job list should go here
  }

  async handleLogin(data) {
    //need to set state based on user logged in
    //maybe do api call in form to send better error msgs
    const resp = await loginUser(data);

    console.log(resp);
    //decide if redirect to job list should go here
  }

  render() {
    return (
      <div className="App">
        <Header
          handleLogin={this.handleLogin} />
        <Main
          handleRegister={this.handleRegister}
          user={this.state.user} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
