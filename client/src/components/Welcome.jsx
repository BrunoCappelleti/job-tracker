import React from 'react';
import RegisterForm from './RegisterForm'
import { withRouter } from 'react-router';

const Welcome = (props) => {
  return (
    <div className='welcome'>
      <div className='site-info'>
        <h3>Welcome to Trackr your job finding resource!</h3>
        <p>We know finding a job is a full-time job. This app aims to make the process a little easier by helping you keep track of all the places you're considering. Our goal is to make sure the only thing you have to worry about are all the offers you'll have to consider!</p>
      </div>
      <RegisterForm
        handleRegister={props.handleRegister}/>
    </div>
  )
}

export default withRouter(Welcome);
