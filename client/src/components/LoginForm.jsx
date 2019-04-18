import React, { Component } from 'react';
import { withRouter } from 'react-router';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: '',
        password: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }));
  }

  loginUser(ev) {
    ev.preventDefault();
    //maybe should validate?
    //decide on what error should be thrown in failed login
    this.props.handleLogin(this.state.formData);
    this.setState({
      formData: {
        email: '',
        password: '',
      }
    });
    this.props.history.push('/jobs');
  }

  handleLogout(ev) {
    ev.preventDefault();
    localStorage.setItem('trackrToken', '');
    this.props.history.push('/');
    //this needs to dump localStorage and user and token from app and redirect to home
  }

  render() {
    const { email, password } = this.state.formData;
    return (
      <div>
        {localStorage.getItem('trackrToken') && <div className="logout-button" onClick={this.handleLogout}>Logout</div>}
        {!localStorage.getItem('trackrToken') && <div className='login-form'>
          <form onSubmit={this.loginUser}>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange} />
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange} />
          <input
            type='submit'
            value='Login' />
          </form>
        </div>}
      </div>
    )
  }
}

export default withRouter(LoginForm);
