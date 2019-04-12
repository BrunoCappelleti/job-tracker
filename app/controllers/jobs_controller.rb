class JobsController < ApplicationController
  def index
    # need ensure it is grabbing the logged in user's jobs
     user = User.find(params[:user_id])
     jobs = Job.where(user_id: user.id)
     render json: { jobs: jobs}
  end

  def create
    # should be create through user attached in middleware
    user = User.find(params[:user_id])
    job = user.jobs.create(job_params)
    if job.valid?
      job.save!
      render json: { job: job }
    else
      render nothing: true, status: 400
    end
  end

  def show
    job = Job.find(params[:id])
    # should validate that user of this job is the same as user in middleware
    render json: { job: job }
  end

  def update
    job = Job.find(params[:id])
    # should validate that user of this job is the same as user in middleware
    job.update!(job_params)
    render json: { job: job }
  end

  def destroy
    job = Job.find(params[:id])
    # should validate that user of this job is the same as user in middleware
    job.destroy()
    render json: { message: 'Job has been deleted'}
  end

  private

  def job_params
    params.permit(:company, :position, :status, :contact_name, :contact_email, :contact_phone)
  end
end
