class AddComentarioToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :comentario, :text
  end
end
