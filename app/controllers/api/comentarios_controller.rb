class Api::ComentariosController < ApplicationController
    before_action :set_comentario, only: [:update, :destroy, :show]
    
    def index
        @post = Post.find(params[:post_id])
        @comentarios = @post.comentarios
        render_json(@comentarios)
      end
    def create
        @comentario = Comentario.new(comentario_params)

        if @comentario.save
            render_json(@comentario, :created)
        else
            render_json({errors: @comentario.errors.full_messages, flash: 'Erro ao criar comentário' }, :unprocessable_entity)
        end

    end
    def update
        if @comentario.update(comentario_params)
            render_json(@comentario)
        else
            render_json({errors: @comentario.errors.full_messages, flash: 'Erro ao atualizar comentário' }, :unprocessable_entity)
        end
    end
    def destroy
        begin
            @comentario.destroy
            render_json({}, :no_content)
        rescue => e
            render_json({error: "Erro ao excluir comentário: #{e.message}"}, :internal_server_error)
        end    
    end

    def show
        render_json(@comentario)
    end

    private
    
    def comentario_params
        params.require(:comentario).permit(:conteudo, :user_id, :post_id)
    end

    def set_comentario
        @comentario = Comentario.find(params[:id])
    end
    def render_json(object, status = :ok)
        render json: { data: object, flash: flash.now[:notice] }, status: status
    end

end
