class BikeRoute < ActiveRecord::Base
	has_and_belongs_to_many :mid_points

	def self.calc_bike_route(start_lat, start_long, end_lat, end_long)
		# Do not execute if there isn't enough information to process
		if start_lat == nil || start_long == nil || end_lat == nil || end_long == nil
		 	return
		end

		# Start the current position at the origin
		current_lat = start_lat
		current_long = start_long
		# Retrieve all points in range of the origin and destination coordinates
		points_in_range = get_points_in_range(start_lat, start_long, end_lat, end_long)

		# Main loop
		while true

			logger.info 'starting loop iteration'

			# Scan the returned mid points for the closest mid point, store in closest latlong variables
			if points_in_range != []
				$closest_distance = distance_to(points_in_range.first[0], points_in_range.first[1], current_lat, current_long)
				closest_lat = points_in_range.first[0]
				closest_long = points_in_range.first[1]
				logger.info 'finding closest entry point'
				closest_latlong = get_entry_point(points_in_range, closest_lat, closest_long, current_lat, current_long)
			end
			logger.info 'got closest entry point'

			# If there are no points that are closer than the destination or no more points are left
			# add the destination and return all coordinates
			dist_to_dest = distance_to(current_lat, current_long, end_lat, end_long)
			if points_in_range == [] || dist_to_dest < $closest_distance
				route << [end_lat, end_long]
				logger.info route
				return route
			end

			# Get all mid points in the bike path which contain the closest mid point
			mid_point = MidPoint.find_by mid_lat: closest_latlong[0], mid_long: closest_latlong[1]
			bike_path = mid_point.bike_routes.first.mid_points

			# Scan the bike_path for the midpoint closest to the destination, store in closest_latlong2 array
			$is_closer = false
			$closest_distance = distance_to(closest_latlong[0], closest_latlong[1], end_lat, end_long)
			closest_lat2 = closest_latlong[0]
			closest_long2 = closest_latlong[1]
			logger.info 'finding closest exit point'
			closest_latlong2 = get_exit_point(bike_path, closest_lat2, closest_long2, end_lat, end_long)
			logger.info 'got closest exit point'

			if $is_closer == true
				# Add the closest positions to the results array
				route << closest_latlong
				route << closest_latlong2
				# Move our current position to the point on the bike track where we need to get off
				current_lat = closest_latlong2[0]
				current_long = closest_latlong2[1]
			end
			# Delete the bike path points as they are no longer needed and must not come back up in future searches
			bike_path.each { |midp| points_in_range.delete([midp.mid_lat, midp.mid_long]) }
			
			logger.info 'finished loop iteration'
		
		end
	end

	def self.get_points_in_range(start_lat, start_long, end_lat, end_long)
		# Get the differences of the latitudes and longitudes
		lat_diff = start_lat - end_lat
		long_diff = start_long - end_long
		# Margin is an amount to add to the search area so as to catch possible useful paths that may not be directly in range, set to approx 500 metres
		margin = 500000
		# Generate the grid around the origin
		eastern_border = start_long + long_diff.abs + margin
		western_border = start_long - long_diff.abs - margin
		northern_border = start_lat + lat_diff.abs + margin
		southern_border = start_lat - lat_diff.abs - margin
		# Array to store the mid points in range
		points_in_range = []
		# Get all the mid points from the database
		mid_points = MidPoint.all
		# Select the mid_points in range and add them to the points_in_range array
		mid_points.each do |mid_point|
			if mid_point.mid_long <= eastern_border &&
			 	 mid_point.mid_long >= western_border &&
			   mid_point.mid_lat <= northern_border &&
			   mid_point.mid_lat >= southern_border

				points_in_range << [mid_point.mid_lat, mid_point.mid_long]
			end
		end

		return points_in_range
	end

	# Computes the distance between two sets of latlong coordinates, uses Pythagoras' theorem (simple way)
	def self.distance_to(lat1, long1, lat2, long2)
		height = lat1 - lat2
		width = long1 - long2
		return Math.sqrt((height*height) + (width*width))
	end

	def self.get_entry_point(points_in_range, closest_lat, closest_long, current_lat, current_long)
		points_in_range.each do |latitude, longitude|
			distance = distance_to(current_lat, current_long, latitude, longitude)
			if distance < $closest_distance
				closest_lat = latitude
				closest_long = longitude
				$closest_distance = distance
			end
		end

		return [closest_lat, closest_long]
	end

	def self.get_exit_point(bike_path, closest_lat2, closest_long2, end_lat, end_long)
		bike_path.each do |midp|
			distance = distance_to(midp.mid_lat, midp.mid_long, end_lat, end_long)
			if distance < $closest_distance
				$is_closer = true # A closer point on the bike path has been found
				closest_lat2 = midp.mid_lat
				closest_long2 = midp.mid_long
				$closest_distance = distance
			end
		end

		return [closest_lat2, closest_long2]
	end

end































