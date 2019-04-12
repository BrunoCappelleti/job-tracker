import React, { Component } from 'react';

//status needs to be considered
//need to ensure validation is proper on handleSubmit
//debate if data dump on modal close should be handled here
//fix handleSubmitForm
//fix componentDidMount

class JobForm extends Component {
  constructor() {
    super();
    this.state = {
      jobFormData: {
        company: '',
        position: '',
        status: false,
        contact_name: '',
        contact_email: '',
        contact_phone: '',
      },
      editing: false,
      formError: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    if(this.props.currentJob) {
      const { company, position, status, contact_name, contact_email, contact_phone } = this.props.currentJob
      this.setState({
        jobFormData: {
          company,
          position,
          status,
          contact_name,
          contact_email,
          contact_phone,
        },
        editing: true,
        formError: false,
      });
    }
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState(prevState => ({
      jobFormData: {
        ...prevState.jobFormData,
        [name]: value,
      }
    }))
  }

  async handleSubmitForm(ev) {
    //this needs to validate for editing or creating and do the proper action accordingly
    ev.preventDefault();
    const { company, position } = this.state.jobFormData;
    if(company && position) {
      const resp = await this.props.submitForm(this.state.jobFormData);
      if(resp) {
        this.setState({
          jobFormData: {
            company: '',
            position: '',
            status: '',
            contact_name: '',
            contact_email: '',
            contact_phone: '',
          },
          editing: false,
        });
        this.props.toggleModal();
      } else {
        console.log('something went wrong');
      }
    } else {
      this.setState({
        formError: true,
      })
    }
  }

  render() {
    const { company, position, status, contact_name, contact_email, contact_phone } = this.state.jobFormData;
    return (
      <div className="job-form-outer">
        <div className="job-form-inner">
          <div className="job-form-subheader">
            <div className="job-close-modal-button" onClick={(ev) => {
              ev.preventDefault();
              this.props.toggleModal()
            }}>X</div>
            <h1 className="job-form-title">{this.state.editing ? 'Edit Job Form' : 'Create Job Form'}</h1>
            <div className="job-form-subtitle">(*indicate a require field)</div>
          </div>
          <form className="job-form" onSubmit={this.handleSubmitForm}>
            <label>*Company:</label>
            <input
              type='text'
              name='company'
              value={company}
              onChange={this.handleChange} /><br/>
            <label>*Position:</label>
            <input
              type='text'
              name='position'
              value={position}
              onChange={this.handleChange} /><br/>
            <label>Status:</label>
            <select
              name="status"
              value={status}
              onChange={this.handleChange}>
              <option value={false}>Passive</option>
              <option value={true}>Active</option>
            </select><br/>
            <label>Contact Name:</label>
            <input
              type='text'
              name='contact_name'
              value={contact_name}
              onChange={this.handleChange} /><br/>
            <label>Contact Email:</label>
            <input
              type='text'
              name='contact_email'
              value={contact_email}
              onChange={this.handleChange} /><br/>
            <label>Contact Phone:</label>
            <input
              type='text'
              name='contact_phone'
              value={contact_phone}
              onChange={this.handleChange} /><br/>
            <input
              type='submit'
              value={this.state.editing ? 'Edit Your Job' : 'Create a New Job'} />
          </form>
          { this.state.formError && <div className="job-form-error-message">Please fill all required fields.</div>}
        </div>
      </div>
    )
  }
}

export default JobForm
