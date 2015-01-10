# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#######################################################################
# TO RESET THE DATABASE SEED DATA BACK TO THE BELOW RUN rake db:reset #
#######################################################################

# BikeRoute.delete_all
# MidPoint.delete_all

# Note routes are started at eiither the west or north and finish towards the east or south

route = BikeRoute.new('name' => 'Bourke Street West, Melbourne')
route.mid_points.new({'mid_lat' => -37.81705628, 'mid_long' => 144.95326996})
route.mid_points.new({'mid_lat' => -37.81637824, 'mid_long' => 144.95578051})
route.mid_points.new({'mid_lat' => -37.81570019, 'mid_long' => 144.95820522})
route.mid_points.new({'mid_lat' => -37.81498823, 'mid_long' => 144.96067286})
route.mid_points.new({'mid_lat' => -37.81427627, 'mid_long' => 144.96314049})
route.save

route = BikeRoute.new('name' => 'Bourke Street East, Melbourne')
route.mid_points.new({'mid_lat' => -37.81278451, 'mid_long' => 144.96814013})
route.mid_points.new({'mid_lat' => -37.81205557, 'mid_long' => 144.9705863})
route.mid_points.new({'mid_lat' => -37.81134358, 'mid_long' => 144.97303247})
route.save

route = BikeRoute.new('name' => 'William Street, Melbourne')
route.mid_points.new({'mid_lat' => -37.80847884, 'mid_long' => 144.95555524})
route.mid_points.new({'mid_lat' => -37.80963163, 'mid_long' => 144.95546941})
route.mid_points.new({'mid_lat' => -37.81173373, 'mid_long' => 144.95641354})
route.mid_points.new({'mid_lat' => -37.81366626, 'mid_long' => 144.95731477})
route.mid_points.new({'mid_lat' => -37.81566654, 'mid_long' => 144.9582589})
route.mid_points.new({'mid_lat' => -37.81763286, 'mid_long' => 144.95911721})
route.mid_points.new({'mid_lat' => -37.81953133, 'mid_long' => 144.96001843})
route.save

route = BikeRoute.new('name' => 'LaTrobe Street, Melbourne')
route.mid_points.new({'mid_lat' => -37.81497128, 'mid_long' => 144.9449873})
route.mid_points.new({'mid_lat' => -37.81342868, 'mid_long' => 144.9503088})
route.mid_points.new({'mid_lat' => -37.81319136, 'mid_long' => 144.95146751})
route.mid_points.new({'mid_lat' => -37.81251328, 'mid_long' => 144.95393515})
route.mid_points.new({'mid_lat' => -37.81178434, 'mid_long' => 144.95642424})
route.mid_points.new({'mid_lat' => -37.81103844, 'mid_long' => 144.95893478})
route.mid_points.new({'mid_lat' => -37.81030948, 'mid_long' => 144.96133804})
route.mid_points.new({'mid_lat' => -37.80959747, 'mid_long' => 144.96387005})
route.mid_points.new({'mid_lat' => -37.8088685, 'mid_long' => 144.96631622})
route.mid_points.new({'mid_lat' => -37.80813953, 'mid_long' => 144.96874094})
route.mid_points.new({'mid_lat' => -37.80756312, 'mid_long' => 144.97056484})
route.save

route = BikeRoute.new('name' => 'Collins Street West, Melbourne')
route.mid_points.new({'mid_lat' => -37.82100575, 'mid_long' => 144.94749784})
route.mid_points.new({'mid_lat' => -37.82059895, 'mid_long' => 144.94867802})
route.mid_points.new({'mid_lat' => -37.81905647, 'mid_long' => 144.95417118})
route.mid_points.new({'mid_lat' => -37.81834454, 'mid_long' => 144.95668173})
route.mid_points.new({'mid_lat' => -37.81766651, 'mid_long' => 144.9591279})
route.mid_points.new({'mid_lat' => -37.81695457, 'mid_long' => 144.96163845})
route.mid_points.new({'mid_lat' => -37.81622568, 'mid_long' => 144.96410608})
route.mid_points.new({'mid_lat' => -37.81551372, 'mid_long' => 144.96655226})
route.mid_points.new({'mid_lat' => -37.81476786, 'mid_long' => 144.96897697})
route.mid_points.new({'mid_lat' => -37.81403894, 'mid_long' => 144.97144461})
route.mid_points.new({'mid_lat' => -37.81332697, 'mid_long' => 144.97395515})
route.save

# Redundant
# route = BikeRoute.new('name' => 'Collins Street East, Melbourne')
# route.mid_points.new({'mid_lat' => -37.81766651, 'mid_long' => 144.95914936})
# route.mid_points.new({'mid_lat' => -37.81732749, 'mid_long' => 144.96022224})
# route.mid_points.new({'mid_lat' => -37.81695457, 'mid_long' => 144.96155262})
# route.save

route = BikeRoute.new('name' => 'Flinders Street, Melbourne')
route.mid_points.new({'mid_lat' => -37.82437873, 'mid_long' => 144.94822741})
route.mid_points.new({'mid_lat' => -37.82244649, 'mid_long' => 144.95005131})
route.mid_points.new({'mid_lat' => -37.8218024, 'mid_long' => 144.95206833})
route.mid_points.new({'mid_lat' => -37.8214295, 'mid_long' => 144.9538064})
route.save

route = BikeRoute.new('name' => 'Swanston Street, Melbourne')
route.mid_points.new({'mid_lat' => -37.8074614, 'mid_long' => 144.96284008})
route.mid_points.new({'mid_lat' => -37.80964833, 'mid_long' => 144.96378422})
route.mid_points.new({'mid_lat' => -37.81156396, 'mid_long' => 144.96472836})
route.mid_points.new({'mid_lat' => -37.81354734, 'mid_long' => 144.96565104})
route.mid_points.new({'mid_lat' => -37.81549677, 'mid_long' => 144.96655226})
route.mid_points.new({'mid_lat' => -37.81748005, 'mid_long' => 144.96745348})
route.mid_points.new({'mid_lat' => -37.82024299, 'mid_long' => 144.96874094})
route.save

route = BikeRoute.new('name' => 'Market Street, Melbourne')
route.mid_points.new({'mid_lat' => -37.81734444, 'mid_long' => 144.96022224})
route.mid_points.new({'mid_lat' => -37.81925987, 'mid_long' => 144.96101618})
route.save

route = BikeRoute.new('name' => 'Spring Street South, Melbourne')
route.mid_points.new({'mid_lat' => -37.80924147, 'mid_long' => 144.97294664})
route.mid_points.new({'mid_lat' => -37.81042815, 'mid_long' => 144.97279644})
route.mid_points.new({'mid_lat' => -37.81136053, 'mid_long' => 144.97305393})
route.mid_points.new({'mid_lat' => -37.81324221, 'mid_long' => 144.9739337})
route.mid_points.new({'mid_lat' => -37.81531031, 'mid_long' => 144.97483492})
route.save

route = BikeRoute.new('name' => 'Spring Street North, Melbourne')
route.mid_points.new({'mid_lat' => -37.80786828, 'mid_long' => 144.97146606})
route.mid_points.new({'mid_lat' => -37.80941099, 'mid_long' => 144.97210979})
route.mid_points.new({'mid_lat' => -37.81042815, 'mid_long' => 144.97258186})
route.save

route = BikeRoute.new('name' => 'Harbour Esplande, Melbourne')
route.mid_points.new({'mid_lat' => -37.81493738, 'mid_long' => 144.9449873})
route.mid_points.new({'mid_lat' => -37.8159036, 'mid_long' => 144.94537354})
route.mid_points.new({'mid_lat' => -37.81900561, 'mid_long' => 144.94670391})
route.mid_points.new({'mid_lat' => -37.8210566, 'mid_long' => 144.94745493})
route.mid_points.new({'mid_lat' => -37.82237869, 'mid_long' => 144.94777679})
route.save
