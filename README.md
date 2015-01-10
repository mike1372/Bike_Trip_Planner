WDI PROJECT TWO - BIKE TRACKER
==============================

OVERVIEW
========

An app that will allow cyclists to pick a safe, bike friendly route for their commute. The route will be created to include bike paths and roads where bike lanes have been installed. Priority will be given to these routes over others without this infrasctructure.

MODELS
======

### The following object models will be used to construct this app:

BIKE_ROUTE
----------
Name

A bike route must have many mid points (two as a minimum) and can also belong to many mid points

MID_POINT
---------
Mid latitude point
Mid longitude point

A mid point belongs to many bike routes and can also have many bike routes

BIKE_ROUTES_MID_POINTS
----------------------

### A bridging table to link the many to many relationships of bike paths and their mid points

Bike route ID
Mid point ID

FEATURES
========

The user will be able to enter a start address and end address
The map will then load the route showing them which way to go
The map will also show the waypoints and the gradients of the route colour coded to steepness
The user will be able to move the waypoints around to alter the route to their desire
The user will also be given a grdient graph showing the route and will be able to move it around in three dimensions

THE ALGORITHM TO GENERATE THE ROUTE
===================================

Start with the origin and destination coordinates
Define a search area between the origin and destination
Start the route off by adding the origin coordinates
Retrieve all the mid points from the database
Search all mid points for those within the search area

While the destination has not yet been reached
	if there are still mid points in points the search area
		Check those mid points for the closest mid point
	end

	if there are no more mid points in the search area or the closest mid point is further away than the destination
		Add the destination coordinates to the route and return the result - algorithm exits here
	end

	Get the bike path that the mid point resides on with all its mid points
	Scan all the mid points on the bike path and find the one closest to the destination

	if a closer midpoint is is found
		Add the coordinates to the route where the bike path was entered
		Add the coordinates to the route where the bike path was exited
	end

	Delete all mid points in the search area that belong to the bike path used
end

ADDITIONAL FEATURES (EXTENSIONS)
================================

* Add elevations and map the route in 3D advising of steep hills
* Provide the ability for the user to reroute around those steep hills
* Locations of toilets and drink fountains
* Points of interest: cafes, bike shops, etc
* Bike parking locations
* Add a fly by view of the route that the user can traverse
* Add a priority system to rank routes and choose the best one
* Overlay the bike route onto traffic density
* Advise of traffic black spots (high accident zones) and areas to avoid

RESOURCES
=========

Google Maps
www.bigyak.net.au/trails/biketrails.net
Google Maps API: 3.16.16
Google Maps, Fusion Tables and tilers
Open Cycle Maps - Andy Allan CC BY-SA 2.0
Open Street Map license FAQs CC BY-SA 2.0
Australian Bureau of Statistics - LGA data copyright CC BY 2.5
Australian Bureau of Meteorology - radar data copyright
Adelaide cyclists - members contributing to the Black spots map
Adelaide cyclists - Don Plush SA Bakeries map
NSW Gov - NSW CyclewayFinder with the permission of Roads and Maritime Services, NSW
NSW Gov - RTA and Premier's Council for Active Living CC BY 2.5
NSW Gov - Road Traffic Authority CC BY 2.5
Vic Gov - VicRoads - Principal Bicycle Network
Vic Gov - Department of Sustainability and Environment - Swooping birds map
Vic Gov - Department of Transport - Melbourne Bike Share
WA - the Public contributing to the site Perth's bike blackspots
Routing with the aid of CloudMade
Web site - copyright BigYak 2011-2013
Cycling Infrastructure Australia
http://toiletmap.gov.au
