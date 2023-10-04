class AddUserIdToComentarios < ActiveRecord::Migration[7.0]
  def change
    add_reference :comentarios, :user, null: false, foreign_key: true
  end
end
