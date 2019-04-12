class UsersController < ApplicationController

  def gen_token(payload)
    JWT.encode(payload, 'Just for now')
  end

  def create
    email = params[:email]
    password = params[:password]
    username = params[:username]
    resume = params[:resume]

    new_user = User.new({
      email: email,
      password: password,
      username: username,
      resume: resume
    })

    if new_user.valid?
      new_user.save!
      user_data = {
        id: new_user.id,
        username: new_user.username,
        email: new_user.email,
        resume: new_user.resume,
      }
      render json: { user: user_data, token: gen_token(user_data) }
    else
      render nothing: true, status: 400
    end
  end

  def login
    email = params[:email]
    password = params[:password]

    user = User.find_from_credentials(email, password)
    if user.nil?
      render nothing: true, status: 401
    else
      user_data = {
        id: user.id,
        username: user.username,
        email: user.email,
        resume: user.resume,
      }
      render json: { user: user_data, token: gen_token(user_data) }
    end
  end

  def update
    email = params[:email]
    password = params[:password]
    username = params[:username]
    resume = params[:resume]

    user = User.find(params[:id])
    if user.update_attributes({
      email: email,
      password: password,
      username: username,
      resume: resume
    })
      render json: { user: user }
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy()
    render json: { message: 'User account deleted'}
  end
end
