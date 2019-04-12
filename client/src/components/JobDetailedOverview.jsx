import React from 'react';

const JobDetailedOverview = (props) => {
  const { currentJob } = props;
  return (
    <div className="job-detailed-overview">
      <h3>Position: {currentJob.position.toUpperCase()}</h3>
      <h3>Status: {currentJob.status ? 'Active' : 'Passive'}</h3>
      <h3>Primary Contact Information:</h3>
      <h4>Name: {currentJob.contact_name}</h4>
      <h4>Email: {currentJob.contact_email}</h4>
      <h4>Phone: {currentJob.contact_phone}</h4>
    </div>
  )
}

export default JobDetailedOverview
