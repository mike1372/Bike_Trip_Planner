
SUGGESTED ALGORITHM FOR CERATING THE ROUTE
==========================================

get origin and destination coordinates and store in two sets of latlong variables, e.g.
	origin_lat
	origin_long
	dest_lat
	dest_long
declare a current_location in latlong variables and set them equal to the origin latlong (keeps track of where we are). e.g.
	current_lat
	current_long
declare a bike_path data structure and set it to empty (not on a path). e.g.
	bike_path = []
declare a route data structure to hold all legs of the journey and add the origin latlong coordinates
	e.g. an array of latlong pairs (in a hash) so that the data structure will be an array of hashes
	route = []

=============================================================
add the origin to the route

get all bike paths from the database within range of the origin and destination

while true (keep looping while there are bike paths in range)

	if there are no midpoints (no paths between the origin and the destination)
		add the destination to the route
		return it to be processed by Google (algorithm exits here)
	end

	scan the returned mid points for the closest midpoint
	set the closest mid point
	get all mid points in the bike path which contains the closest mid point
	scan the bike_path for the midpoint closest to the destination
		if there is a mid point closer
			set the flag

	while the flag is clear (no point on the path is closer - returned bike path is going the wrong way) AND there are still mid points in the returned mid points
		remove that closest mid point from the returned mid points array
		scan the remaining returned mid points for the closest midpoint - use the current_location
		get all mid points of the bike path which contains the closest mid point
		scan the bike_path for the midpoint closest to the destination
			if there is a mid point closer
				set the flag										
	end

	if the returned mid points array is not empty
		set the closest midpoint as the new current_location
		add this midpoint to the route
		get all mid points of the bike path which contains the closest(now current) mid point
		scan the bike_path for the midpoint closest to the destination
		set this midpoint as the new current_location
		add this midpoint to the route
	end

end
=============================================================

Note the "radius" in this case will need to be a grid square with the current location centered inside.
if more than one is returned then return all bike paths - NOT HANDLED YET


				points_in_range.each do |latitude, longitude|
				height = current_lat - latitude
				width = current_long - longitude
				distance = Math.sqrt((height*height) + (width*width))
				# Set the current position if a closer mid point is found
				if distance < closest_distance
					current_lat = latitude
					current_long = longitude
					closest_distance = distance
				end

				height = bike_route.first.mid_lat - lat
				width = bike_route.first.mid_long - long
				closest_distance = Math.sqrt((height*height) + (width*width))
				counter = 0
				while counter < bike_route.length
					height = final_lat - bike_route[counter].mid_lat
					width = final_long - bike_route[counter].mid_long
					distance = Math.sqrt((height*height) + (width*width))
					if distance < closest_distance
						closer = true
						closest_distance = distance
					end
					counter += 1
				end





			end