class AddColumnToBikeRoutes < ActiveRecord::Migration
  def change
    add_column :bike_routes, :name, :string
  end
end
