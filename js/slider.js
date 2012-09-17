var slider_features;
var slider_pois;

var tmpSema = false;

function handleSliderChange(slider, type, idx){
	if(!tmpSema){
		if(type == "feature")
			features_weight[idx] = slider.getValue() / 200;
		else{
			pois_weight[idx] = slider.getValue() / 200;
		}
		handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);	
	}
}

function handleSelectFeatures(){
	window.open('select_features.html', 'SelectFeaturesWindow',
		 'width=300,height=200');
}

function handleSelectPois(){
	window.open('select_pois.html', 'SelectPoisWindow',
		'width=300,height=250');	
}

function handleFeatureSelectionUpdate(){
	document.all.tr_feature_age.style.display = features_selection[0] ? 'block' : 'none';
	document.all.tr_feature_cars.style.display = features_selection[1] ? 'block' : 'none';
	document.all.tr_feature_households.style.display = features_selection[2] ? 'block' : 'none';
//	document.all.tr_feature_unemployment.style.display = features_selection[3] ? 'block' : 'none';
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);
}

function handlePoisSelectionUpdate(){
	document.all.tr_poi_kindergartens.style.display = pois_selection[0] ? 'block' : 'none';
	document.all.tr_poi_gasstations.style.display = pois_selection[1] ? 'block' : 'none';
	document.all.tr_poi_schools.style.display = pois_selection[2] ? 'block' : 'none';
	document.all.tr_poi_supermarkets.style.display = pois_selection[3] ? 'block' : 'none';
	document.all.tr_poi_restaurants.style.display = pois_selection[4] ? 'block' : 'none';
	document.all.tr_poi_doctors.style.display = pois_selection[5] ? 'block' : 'none';
	document.all.tr_poi_pharmacies.style.display = pois_selection[6] ? 'block' : 'none';
	document.all.tr_poi_hardwarestores.style.display = pois_selection[7] ? 'block' : 'none';
	document.all.tr_poi_hardwarestores.style.display = pois_selection[8] ? 'block' : 'none';
	document.all.tr_poi_hardwarestores.style.display = pois_selection[9] ? 'block' : 'none';
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);
}

function setPreset(preset){
	tmpSema = true;

	// District Feature sliders

	if(preset == 2){
		features_selection[0] = true;
		features_weight[0] = 0.7;
		$("#slider_feature_age").slider('value',features_weight[0]*200);
	}else features_selection[0] = false;
	
	if(preset == 1){
		features_selection[1] = true;
		features_weight[1] = 0.1;
		$("#slider_features_cars").slider('value',features_weight[0]*200);
	}else features_selection[1] = false;
	
	if( (preset == 1) || (preset == 3) ){
		features_selection[2] =  true;
		features_weight[2] = ((preset == 1) ? 0.8 : 0.9 );
		$("#slider_slider_feature_households").slider('value',features_weight[0]*200);

	}else features_selection[2] = false;
	

	// POI sliders

	pois_selection[0] = (preset == 1) || (preset == 3);
	pois_weight[0] = 0.8;
	if(preset == 1 || preset == 3){
		$("#slider_poi_kindergartens").slider('value',features_weight[0]*200);
	}
		
	pois_selection[1] = false;
	pois_weight[1] = 0;
//		$("#slider_poi_gasstations").slider('value',features_weight[0]*200);
	
	pois_selection[2] = (preset == 1) || (preset == 3);
	pois_weight[2] = 0.2;
	if(preset == 1 || preset == 3){
		$("#slider_poi_schools").slider('value',features_weight[0]*200);
	}
		
	pois_selection[3] = (preset == 1);
	pois_weight[3] = 0.8;
	if(preset == 1){
		$("#slider_poi_restaurants").slider('value',features_weight[0]*200);
	}

	pois_selection[4] = (preset == 2);
	pois_weight[4] = 0.8
	if(preset == 2){
		$("#slider_poi_doctors").slider('value',features_weight[0]*200);
	}

	pois_selection[5] = false;
	pois_weight[5] = 0;
//	if(){
//		$("#slider_poi_pharmacies").slider('value',features_weight[0]*200);
// }

	pois_selection[6] = (preset == 1); 
	pois_weight[6] = 0.1;
	if(preset == 1){
		$("#slider_poi_pubs").slider('value',features_weight[0]*200);
	}

	pois_selection[7] = false;
	pois_weight[7] = 0;
//	if(){
//		$("#slider_poi_kindergartens").slider('value',features_weight[0]*200);
// }

	pois_selection[8] = (preset == 1); 
	pois_weight[8] = 0.1;
	if(preset == 1){
//		slider_pois[8].setValue(pois_weight[8]*200);
		$("#slider_poi_parking").slider('value',features_weight[0]*200);
	}

	pois_selection[9] = (preset == 1); 
	pois_weight[9] = 0.1;
	if(preset == 1){
//		slider_pois[9].setValue(pois_weight[9]*200);
		$("#slider_poi_atm").slider('value',features_weight[0]*200);
	}
	
	tmpSema = false;
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);	
}
