class RemoveColumnFromBikeRoutes < ActiveRecord::Migration
  def change
    remove_column :bike_routes, :start_lat, :string
    remove_column :bike_routes, :start_long, :string
    remove_column :bike_routes, :end_lat, :string
    remove_column :bike_routes, :end_long, :string
  end
end
