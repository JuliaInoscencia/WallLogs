class AddConteudoToComentarios < ActiveRecord::Migration[7.0]
  def change
    add_column :comentarios, :conteudo, :text
  end
end
