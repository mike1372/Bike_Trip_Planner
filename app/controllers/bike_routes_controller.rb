class BikeRoutesController < ApplicationController

	def index
		# http://localhost:3000/bike_route?startlat=1&startlong=1&endlat=1&endlong=1
		@route = BikeRoute.calc_bike_route(params[:start_lat].to_f, params[:start_long].to_f, params[:end_lat].to_f, params[:end_long].to_f)
		# raise params.inspect
		respond_to do |format|
			format.html {}
			format.json { render :json => @route }
		end
	end

end
