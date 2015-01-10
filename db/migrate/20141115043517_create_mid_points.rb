class CreateMidPoints < ActiveRecord::Migration
  def change
    create_table :mid_points do |t|
      t.float :mid_lat
      t.float :mid_long
      t.integer :bike_routes_id

      t.timestamps
    end
  end
end
