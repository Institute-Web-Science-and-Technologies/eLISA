function init(){
	map_init();
	//slider_init();
}

var poi_status = new Array();
var feature_status = new Array();

function handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight) {
	var tableOfFeature;  // table aus des feature i entnommen wird
	var indexOfFeature;  //index fuer jedes feature
	
	var tableOfFeature = new Array();
	var indexOfFeature = new Array();
	  // feature: age   
	  // sehr jung = unter 25
	tableOfFeature[0] = altersgruppen2011norm;
	indexOfFeature[0] = 3;
	// tableOfFeature[0] = Bezirke2009singlehhnorm;
	// indexOfFeature[0] = 4;
	  // feature: cars
	tableOfFeature[1] = verkehrsdichte2011norm;
	indexOfFeature[1] = 3;
	  // feature singles
	tableOfFeature[2] = haushalte2011norm;
	indexOfFeature[2] = 3;
	  // feature families
	tableOfFeature[3] = haushalte2011norm;
	indexOfFeature[3] = 4;
	  // feature unemployment
//	tableOfFeature[4] = Bezirke2009tabnorm;
//	indexOfFeature[4] = 10;
	  // feature fluctuation
	//tableOfFeature[5] = Bezirke2009tabnorm;
	//indexOfFeature[5] = 9;
	
	feature_status[0] = 0;

	for (var district=1; district < 31; district++) {
//		console.log("Bezirk: " + district);
		var regionOpacity = 0;
		for (var j=0; j<tableOfFeature.length; j++){
//			console.log("Feature: " + j);
			if (features_selection[j] == true){
//				console.log("Feature selected ");
						var featureWeight = features_weight[j]; 
						var featureValue = tableOfFeature[j][district][indexOfFeature[j]];
				switch(j) {
					case 0:  
	    					regionOpacity += (1-Math.abs(featureWeight-featureValue)) * norm_Factors.age;
//console.log("	Cars selected, weight: " + featureWeight + " featureValue: " + featureValue + " opacity" + regionOpacity);	
	   				break;
					case 1:
						featureWeight = 2*featureWeight-1;
	    					regionOpacity += (2*featureWeight*(featureValue-0.5)) * norm_Factors.cars;
console.log("	singlevs selected, weight: " + featureValue + " featureValue: " + featureWeight + " opacity" + regionOpacity);	
	   				break;
					case 2:
						if(featureWeight < 0){
							featureWeight = featureWeight * -1;
	    						featureValue = tableOfFeature[3][district][indexOfFeature[3]];		
						}
						regionOpacity += featureWeight*featureValue * norm_Factors.singlevscouple;
//console.log("	employment selected, weight: " + featureValue + " featureValue: " + featureWeight + " opacity" + regionOpacity);	
	   				break;
//					case 3:
//						featureWeight = 2*featureWeight-1;
//						featureValue = tableOfFeature[4][district][indexOfFeature[4]];
//	    					regionOpacity += (2*featureWeight*(0.5-featureValue)) * norm_Factors.employment;
//console.log("	Age selected, weight: " + featureValue + " featureValue: " + featureWeight + " opacity" + regionOpacity);	
	   				//break;	
				}		
			}
		}
		regionOpacity *= norm_Factors.globalRegion;
		if (regionOpacity < 0 ){
					regionOpacity = 0;				
				}
		district_id = altersgruppen2011norm[district][1];
		feature_status[district_id] = regionOpacity;	
	}

	// prepare status mask for selected POIs
	poi_status = new Array();
	for (i=0, len=pois.length; i<len; i++) {
		if (pois_selection[i]) poi_status.push({ id: pois[i], weight: pois_weight[i] });
	}

	drawLayers();
}

// logging with firebug
function log(msg) {
	if (typeof console === 'undefined')
		return;
	console.log(msg);
}
