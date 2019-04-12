import React from 'react';
import { withRouter } from 'react-router';

//each job needs an onClick to redirct to it's detailed page
//possibly do an expanded view to see see a little more about each job
//it might be worth turning this into a class component allowing tabs to filter

const JobsList = (props) => {
  return (
    <div className="jobs-list">
      {props.jobs.map(el => (
        <div key={el.id} className="job" onClick={(ev) => {
          ev.preventDefault();
          props.history.push(`/jobs/${el.id}`)
        }}>
          <div className="job-company">Company: {el.company.toUpperCase()}</div>
          <div className="job-position">Position: {el.position.toUpperCase()}</div>
          <div className="job-status">Status: {`${el.status}`}</div>
          <div className="job-id">Job-ID: {el.id}</div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(JobsList);
