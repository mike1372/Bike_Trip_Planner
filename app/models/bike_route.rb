class BikeRoute < ActiveRecord::Base
	has_and_belongs_to_many :mid_points
end
