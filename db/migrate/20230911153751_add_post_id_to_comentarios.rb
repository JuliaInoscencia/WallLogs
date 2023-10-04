class AddPostIdToComentarios < ActiveRecord::Migration[7.0]
  def change
    add_reference :comentarios, :post, null: false, foreign_key: true
  end
end
