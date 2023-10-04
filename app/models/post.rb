class Post < ApplicationRecord

    belongs_to :user
    has_many :comentarios, dependent: :destroy

    validates :titulo, length: {minimum: 3}
    validates :conteudo, presence: true
end
