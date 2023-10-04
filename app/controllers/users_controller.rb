class UsersController < ApplicationController
  require 'jwt'

  before_action :authenticate_user!, only: [:logout]
  before_action :set_user, only: [:destroy, :update]
  #skip_before_action :verify_authenticity_token 

  def signup
    user = User.new(user_params)

    if user.save
      render json: { message: 'Usuário registrado com sucesso', user: user }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: user_params[:email])
    p user_params
    p "========"
    p user
    
    # isso acima são puts que usei para debugar e achar onde estava causando o erro, puts é semelhante a um print e um console.log.
    if user.present? && user.valid_password?(user_params[:password])
      sign_in(user) 
      render json: { message: "Logged in successfully", user: user }
    else
      render json: { message: "Invalid email or password" }, status: :unauthorized
    end
  end

  def logout
    sign_out(current_user) 
    render json: { message: "Logged out successfully" }
  end
  
  def update
    puts "Current User: #{current_user.inspect}"
    if @user.update(user_params)
      render json: { message: "Perfil atualizado com sucesso", user: @user }
    else
      render json: { errors: @user.errors.full_messages, flash: 'Erro ao atualizar perfil' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      sign_out(current_user)
      render json: { message: "Conta excluída com sucesso" }
    else
      render json: { error: "Erro ao excluir conta: #{user.errors.full_messages.join(', ')}" }, status: :unprocessable_entity
    end
  end

  private 

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation
    )
  end

  def set_user
    @user = User.find(params[:id])
  end
  
end

  
