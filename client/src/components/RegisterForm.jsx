import React, { Component } from 'react';
import { withRouter } from 'react-router';

//createNewUser has to be fixed
//all input fields should have a good placeholder

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: '',
        email: '',
        password: '',
        confirm_pass: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }))
  }

  createNewUser(ev) {
    ev.preventDefault();
    //should validate for an acceptable form and that passwords match
    //decide if api call goes here for better error message
    this.props.handleRegister(this.state.formData);
    this.setState({
      formData: {
        username: '',
        email: '',
        password: '',
        confirm_pass: '',
      }
    });
    this.props.history.push('/jobs');
  }

  render() {
    const { username, email, password, confirm_pass } = this.state.formData
    return (
      <div className='register-form'>
        <h1>Get Started!</h1>
        <form onSubmit={this.createNewUser}>
          <label>Username:</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={this.handleChange} />
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
          <label>Confrim Password:</label>
          <input
            type='password'
            name='confirm_pass'
            value={confirm_pass}
            onChange={this.handleChange} />
          <input
            type='submit'
            name='Create a New Acccount' />
        </form>
      </div>
    )
  }
}

export default withRouter(RegisterForm);
