class Api::PostsController < ApplicationController
  #before_action :authenticate_user!, only: [:destroy]
  before_action :set_post, only: [:destroy, :update, :show]

  def index
    @posts = Post.all
    render_json(@posts)
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render_json(@post, :created)
    else
      render_json({ errors: @post.errors.full_messages, flash: 'Erro ao criar o post' }, :unprocessable_entity)
    end
  end

  def update
    if @post.update(post_params)
      render_json(@post)
    else
      render_json({ errors: @post.errors.full_messages, flash: 'Erro ao atualizar o post' }, :unprocessable_entity)
    end
  end

  def destroy
  #  if user_can_delete?(@post)
      begin
        puts 'Tentando excluir o post controller...'
        @post.destroy
        render_json({}, :no_content)
      rescue => e
        puts "Erro ao excluir o post: #{e.message}"
        render_json({ error: "Erro ao excluir o post: #{e.message}" }, :internal_server_error)
      end
    #else
    #  puts "Usuário não autenticado: #{current_user.inspect}" unless user_signed_in?
    #  puts 'O usuário não tem permissão para excluir este post'
    #  render_json({ error: "Você não tem permissão para excluir este post" }, :forbidden)
    #end
  end

  def show
    render_json(@post)
  end

  def busca
    @busca_por_titulo = params[:titulo]
    @posts = Post.where("titulo LIKE ?", "%#{params[:titulo]}%")
    render_json(@posts)
  end

  private

  def post_params
    params.require(:post).permit(:titulo, :conteudo, :user_id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  #def user_can_delete?(post)
  #  return false unless user_signed_in?
  #  current_user.id == post.user_id
  #end

  def render_json(object, status = :ok)
    render json: { data: object, flash: flash.now[:notice] }, status: status
  end
end
