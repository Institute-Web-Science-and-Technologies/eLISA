var features = ['age','cars','households','unemployment','fluctuation'];
var features_labels = ['Altersdurchschnitt','Verkehrsdichte','Haushaltsstruktur','Erwerbst&auml;tigenquote'];
var features_selection = [true,true,true,true];
var features_weight = [0,0,0,0];	// weights are in [0,1]

var pois = ['kindergartens','gasstations','schools','fastfood','restaurants','doctors','pharmacies','pubs','parking','atm'];
var pois_labels = ['Kinderg&auml;rten','Tankstellen','Schulen','Superm&auml;rkte','Restaurants','&Auml;rzte','Apotheken','Pubs','Parking','ATM'];

var pois_selection = [true,true,true,true,true,true,true,true,true,true];
var pois_weight = [0,0,0,0,0,0,0,0,0,0];	// weights are in [0,1]


 // Dateinamen werden nur als Namen verwendet
var poijson = {'kindergartens': poikindergarten ,'gasstations': poifuel ,'schools':poischool,'fastfood':poifastfood,'restaurants':poirestaurant,'doctors':poidoctors,'pharmacies':poipharmacy , 'pubs': poipub, 'parking': poiparking, 'atm':poiatm};

poi_setup = {
	'kindergartens' :  { radius: 800, intensity: 0.8, poijson: poipub },
	'gasstations' :    { radius: 800, intensity: 0.8, poijson: poifuel  },
	'schools' :        { radius: 800, intensity: 0.8, poijson: poischool },
	'fastfood' :       { radius: 800, intensity: 0.8, poijson: poifastfood },
	'restaurants' :    { radius: 400, intensity: 0.8, poijson: poirestaurant },
	'doctors' :        { radius: 800, intensity: 0.8, poijson: poidoctors },
	'pharmacies' :     { radius: 800, intensity: 0.8, poijson: poipharmacy },
	'pubs' :           { radius: 800, intensity: 0.8, poijson: poipub },
	'parking' :        { radius: 800, intensity: 0.8, poijson: poiparking },
	'atm' :            { radius: 800, intensity: 0.8, poijson: poiatm }
}

//poi_setup = {
//	'kindergartens' :  { radius: 800, intensity: 0.5, file: 'poi/kindergarten.osm' },
//	'gasstations' :    { radius: 800, intensity: 0.5, file: 'poi/fuel.osm' },
//	'schools' :        { radius: 800, intensity: 0.5, file: 'poi/school.osm' },
//	'fastfood' :       { radius: 800, intensity: 0.5, file: 'poi/fastfood.osm' },
//	'restaurants' :    { radius: 400, intensity: 0.5, file: 'poi/restaurant.osm' },
//	'doctors' :        { radius: 800, intensity: 0.5, file: 'poi/doctors.osm' },
//	'pharmacies' :     { radius: 800, intensity: 0.5, file: 'poi/pharmacy.osm' },
//	'pubs' :           { radius: 800, intensity: 0.5, file: 'poi/doityourself.osm' },
//	'parking' :        { radius: 800, intensity: 0.5, file: 'poi/parking.osm' },
//	'atm' :            { radius: 800, intensity: 0.5, file: 'poi/atm.osm' },

norm_Factors = {
	'age'			: 1,
	'cars'			: 1,
	'singlevscouple'	: 1,
	'employment'		: 1,
	'globalRegion'		: 0.8
}
