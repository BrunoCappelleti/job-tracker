import React, { Component } from 'react';
import JobsList from './JobsList'
import JobForm from './JobForm'
import { withRouter } from 'react-router';
import { createJob, getJobs } from '../services/apiHelper';

//ensure componentDidMount is functioning correctly
//fix toggleModal
//fix handleCreateJob

class JobsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      showCreateModal: false,
    }
    this.handleCreateJob = this.handleCreateJob.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  async componentDidUpdate(prevProps) {
    if(this.props.user.id !== prevProps.user.id) {
      const resp = await getJobs(this.props.user.id);
      if(resp) {
        const { jobs } = resp;
        this.setState({
          jobs,
          loading: false,
        })
      } else {
        console.log('something went wrong');
      }
    }
  }

  toggleModal() {
    //might have to alter this to dump data on modal close
    this.setState(prevState => ({
      showCreateModal: !prevState.showCreateModal
    }))
  }

  async handleCreateJob(data) {
    //need to make this with all proper api calls and validations
    //need to ensure that job is added in the right place in array
    console.log(data);
    const resp = await createJob(this.props.user.id, data);
    if(resp) {
      const { job } = resp
      this.setState(prevState => ({
        jobs: [ ...prevState.jobs, job],
      }));
      return true;
    } else {
      return false;
    };
  }

  render() {
    const { loading, jobs, showCreateModal } = this.state
    return (
      <div className="jobs-list-view">
        {loading && <h1>Please hold...</h1>}
        {!loading &&
          <div>
          {showCreateModal &&
            <JobForm
            submitForm={this.handleCreateJob}
            toggleModal={this.toggleModal} />}
            <div className="job-subheader">
              <h1>Here are your jobs:</h1>
              <div className="create-job-button" onClick={(ev) => {
                ev.preventDefault();
                this.toggleModal()
              }}>Open a New Job!</div>
            </div>
            <JobsList
              jobs={jobs} />
        </div>}
      </div>
    )
  }
}

export default withRouter(JobsView);
