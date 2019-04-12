import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Welcome from './Welcome';
import JobsView from './JobsView';
import JobDetailedView from './JobDetailedView';

const Main = (props) => {
  const { handleRegister, user } = props;
  return (
    <div className='main'>
      <Route exact path="/" render={(props) => (
        <Welcome
          {...props }
          handleRegister={handleRegister} />
      )} />
      <Route exact path="/jobs" render={(props) => (
        <JobsView
          { ...props }
          user={user} />
      )} />
      <Route exact path="/jobs/:jobId" render={(props) => (
        <JobDetailedView
          { ...props }
          user={user} />
      )} />
    </div>
  )
};

export default withRouter(Main);
