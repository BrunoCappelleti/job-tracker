class NotesController < ApplicationController
  def index
    # need ensure it is grabbing the logged in user's notes for their job
     job = Job.find(params[:job_id])
     notes = Note.where(job_id: job.id)
     render json: { job: job, notes: notes}
  end

  def create
    # there has to be some kind of middleware validation here
    job = Job.find(params[:job_id])
    note = job.notes.create(notes_params)
    if note.valid?
      note.save!
      render json: { note: note }
    else
      render nothing: true, status: 401
    end
  end

  def update
    note = Note.find(params[:id])
    # should validate that this note belongs to the right job and user
    note.update!(note_params)
    render json: { job: job }
  end

  def destroy
    note = Note.find(params[:id])
    # should validate that user of this job is the same as user in middleware
    note.destroy()
    render json: { message: 'Note has been deleted'}
  end

  private

  def notes_params
    params.permit(:content)
  end
end
