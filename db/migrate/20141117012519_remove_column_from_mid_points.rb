class RemoveColumnFromMidPoints < ActiveRecord::Migration
  def change
    remove_column :mid_points, :bike_routes_id, :string
  end
end
