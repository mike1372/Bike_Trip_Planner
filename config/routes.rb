Rails.application.routes.draw do

  root 'bike_routes#index'
  get '/bike_route' => 'bike_routes#index'

end
