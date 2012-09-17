var featureVectors = null;

function draw_bezirke() {
	if (featureVectors != null) {
		draw_polies();
	} else {
		loadData("./Geodaten/Gekauft_Stadtbezirke.kml", 
			function(data) {
			// new KML parser
				var format = new OpenLayers.Format.KML(); 
				featureVectors = format.read(data);
				draw_polies();		
		}, null);
	}
}


function draw_polies() {
	//console.log("DrawLayers called from : ");
	var polygons = new Array();
	console.log("Drawing Polies with " + featureVectors.length + " Features.");
	for (var numOfFeature = 0; numOfFeature < featureVectors.length; numOfFeature++) {
		// new style, opacity to be set here
		//console.log("SB_Nummer " + featureVectors[numOfFeature].attributes.SB_NUMMER.value);		
		var poly_style = calculateOpacity(featureVectors[numOfFeature].attributes.SB_NUMMER.value);
		//set new Style in feature
		featureVectors[numOfFeature].style = poly_style;
		//transform features geometry to map geometry
		featureVectors[numOfFeature].geometry.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
		//var polygon = new OpenLayers.Feature.Vector(featureVectors[numOfFeature].geometry, null, poly_style);
		//polygons.push(polygon);
		//console.log("Opacity for " + numOfFeature + " : " + featureVectors[numOfFeature].style.fillOpacity);
		console.log("Drawing SB_Name: " + featureVectors[numOfFeature].attributes.name + " SB_Nummer: " + featureVectors[numOfFeature].attributes.SB_NUMMER.value + " Lookup Nummer: " + (featureVectors[numOfFeature].attributes.SB_NUMMER.value<<0) + " Opacity: " + featureVectors[numOfFeature].style.fillOpacity);
			
	}
	//vectorLayer.addFeatures(polygons);
	vectorLayer.addFeatures(featureVectors);
}




function calculateOpacity(numOfFeature) {
	var num = numOfFeature<<0;
	//var opacity = Math.random();
	//console.log("Opacity : " + opacity);
	var opacity = feature_status[num];
	//console.log("Bezirk Nr. : " + (numOfFeature<<0) + " Opacity: " + opacity)	
	var poly_style = {
			fillOpacity : opacity,
			fillColor   : "white",
			stroke      : false,
			strokeColor : "grey"
	};	
	return poly_style;
}
