var features = ['age','cars','households','unemployment','fluctuation'];
var features_labels = ['Altersdurchschnitt','Verkehrsdichte','Haushaltsstruktur','Erwerbst&auml;tigenquote'];
var features_selection = [false,false,false,false];
var features_weight = [0,0,0,0];	// weights are in [0,1]

var pois = ['kindergartens','gasstations','schools','supermarkets','restaurants','doctors','pharmacies','hardwarestores'];
var pois_labels = ['Kinderg&auml;rten','Tankstellen','Schulen','Superm&auml;rkte','Restaurants','&Auml;rzte','Apotheken','Baum&auml;rkte'];
var pois_selection = [false,false,false,false,false,false,false,false];
var pois_weight = [0,0,0,0,0,0,0,0];	// weights are in [0,1]

poi_setup = {
	'kindergartens' :  { radius: 800, intensity: 0.8, file: 'poi/kindergarten.osm' },
	'gasstations' :    { radius: 800, intensity: 0.8, file: 'poi/fuel.osm' },
	'schools' :        { radius: 800, intensity: 0.8, file: 'poi/school.osm' },
	'supermarkets' :   { radius: 800, intensity: 0.8, file: 'poi/supermarket.osm' },
	'restaurants' :    { radius: 400, intensity: 0.8, file: 'poi/restaurant.osm' },
	'doctors' :        { radius: 800, intensity: 0.8, file: 'poi/doctors.osm' },
	'pharmacies' :     { radius: 800, intensity: 0.8, file: 'poi/pharmacy.osm' },
	'hardwarestores' : { radius: 800, intensity: 0.8, file: 'poi/doityourself.osm' }
}

norm_Factors = {
	'age'			: 1,
	'cars'			: 1,
	'singlevscouple'	: 1,
	'employment'		: 1,
	'globalRegion'		: 0.8
}
