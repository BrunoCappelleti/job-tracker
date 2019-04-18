import React, { Component } from 'react';
import JobDetailedOverview from './JobDetailedOverview';
import JobForm from './JobForm';
import { withRouter } from 'react-router';
import jwtDecode from 'jwt-decode';
import { getNotes, updateJob, deleteJob } from '../services/apiHelper';

//fix componentDidUpdate
//confirm delete was working butverbose create a component and add at another time

class JobDetailedView extends Component {
  constructor() {
    super();
    this.state = {
      currentJob: '',
      notes: [],
      loading: true,
      showEditJobModal: false,
      showNotesModal: false,
    };
    this.toggleEditJobModdal = this.toggleEditJobModdal.bind(this);
    this.handleEditJob = this.handleEditJob.bind(this);
    this.handleDeleteJob = this.handleDeleteJob.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }



  async componentDidMount() {
    //should see if it's being passed a job and do a call based on that
    //need to make a calls for all the notes for a specific job
    //if this proves difficult, just redirect to jobslist if no job in props
    const user = this.props.user
    const token = localStorage.getItem('trackrToken');
    if(user) {
      const resp = await getNotes(user.id, this.props.match.params.jobId);
      if(resp) {
        const { job, notes } = resp
        this.setState({
          currentJob: job,
          notes,
          loading: false,
        })
      } else {
        console.log('something went wrong');
      }
    } else if (token) {
      const data = jwtDecode(token);
      const resp = await getNotes(data.id, this.props.match.params.jobId);
      if(resp) {
        const { job, notes } = resp
        this.setState({
          currentJob: job,
          notes,
          loading: false,
        });
      } else {
        console.log('something went wrong');
      }
    } else {
      this.props.history.push('/');
    }
  }

  toggleEditJobModdal(ev) {
    this.setState(prevState => ({
      showEditJobModal: !prevState.showEditJobModal,
    }))
  }

  handleBack(ev) {
    ev.preventDefault();
    this.props.history.push('/jobs');
  }

  async handleEditJob(data) {
    const userId = this.props.user.id;
    const jobId = this.state.currentJob.id
    const resp = await updateJob(userId, jobId, data);
    if(resp) {
      this.setState({
        currentJob: resp,
      });
      return true;
    } else {
      return false;
    }
  }

  async handleDeleteJob(ev) {
    const userId = this.props.user.id;
    const jobId = this.state.currentJob.id;
    const resp = await deleteJob(userId, jobId);
    if(resp) {
      this.props.history.push('/jobs');
    } else {
      console.log('something went wrong');
    }
  }

  render() {
    const { loading, currentJob, showEditJobModal } = this.state
    return (
      <div>
        {loading && <h1>Please hold...</h1>}
        {!loading &&
          <div className="job-detailed-view">
          { showEditJobModal &&
            <JobForm
              currentJob={currentJob}
              toggleModal={this.toggleEditJobModdal}
              submitForm={this.handleEditJob}/>
          }
            <div className="job-detailed-header">
              <div className="job-detailed-back-button" onClick={this.handleBack}>Back to List</div>
              <h1>{currentJob.company.toUpperCase()}</h1>
              <div className="job-detailed-options">
                <div onClick={this.toggleEditJobModdal}>Edit Job</div>
                <div onClick={this.handleDeleteJob}>Delete Job</div>
              </div>
            </div>
            <JobDetailedOverview
              currentJob={currentJob} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(JobDetailedView);
