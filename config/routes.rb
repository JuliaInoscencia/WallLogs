Rails.application.routes.draw do
  namespace :api do
    resources :posts, only: [:index, :create, :destroy, :update, :show] do
      resources :comentarios, only: [:index, :create, :update, :destroy, :show]
    end
    put '/posts/:post_id/comentarios/:id', to: 'comentarios#update', as: :update_comentario
    #delete '/comentarios/:id', to: 'comentarios#destroy', as: :destroy_comentario
    delete '/posts/:post_id/comentarios/:id', to: 'comentarios#destroy', as: :destroy_comentario
    get "/posts/busca" => "posts#busca", as: :busca_post
    root "posts#index"
  end

  devise_for :users
  post '/login', to: 'users#login'
  post '/signup', to: 'users#signup'
  delete '/logout', to: 'users#logout'
  patch "/profile/:id", to: 'users#update', as: :update_profile
  delete '/profile/delete', to: 'users#destroy', as: :destroy_profile

  get '/*path', to: 'application#fallback_index_html', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end

