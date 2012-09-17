function handleSliderChange(slider, type, idx){
	if(type == "feature")
		features_weight[idx] = slider.getValue() / 100;
	else
		pois_weight[idx] = slider.getValue() / 100;
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);	
}

function handleSelectFeatures(){
	window.open('select_features.html', 'SelectFeaturesWindow',
		 'width=300,height=200');
}

function handleSelectPois(){
	window.open('select_pois.html', 'SelectPoisWindow',
		'width=300,height=250');	
}

function setPreset(preset){
	features_selection[0] = preset == 2;
	features_weight[0] = 0.7;
	features_selection[1] = preset == 1;
	features_weight[1] = 0.1;
	features_selection[2] = preset == 1 || preset == 3;
	features_weight[2] = (preset == 1) ? 0.8 : 0.9;
//	features_selection[3] = preset == 3;
//	features_weight[3] = 0.7;
	
	pois_selection[0] = preset == 1 || preset == 3;
	pois_weight[0] = 0.8;
	pois_selection[1] = preset == 1;
	pois_weight[1] = 0.3;
	pois_selection[2] = preset == 1 || preset == 3;
	pois_weight[2] = 0.2;
	pois_selection[3] = preset == 1;
	pois_weight[3] = 0.5;
	pois_selection[4] = preset == 2;
	pois_weight[4] = 0.8;
	pois_selection[5] = false;
	pois_weight[5] = 0;
	pois_selection[6] = preset == 1; 
	pois_weight[6] = 0.1;
	pois_selection[7] = false;
	pois_weight[7] = false;
	pois_selection[8] = preset == 1 || preset == 2;
	pois_weight[8] = 0;
	pois_selection[9] = preset == 1 || preset == 3;
	pois_weight[9] = 0;
	
	for(i = 0; i< 4; i++)
		slider_features[i].setValue(features_weight[i]*100);
	for(i = 0; i< 10; i++)
		slider_pois[i].setValue(pois_weight[i]*100);
	
	handleFeatureSelectionUpdate();
}

function handleFeatureSelection(){
	opener.features_selection[0] = document.all.feature_age.checked;
	opener.features_selection[1] = document.all.feature_cars.checked;
	opener.features_selection[2] = document.all.feature_households.checked;
//	opener.features_selection[3] = document.all.feature_unemployment.checked;
	opener.handleFeatureSelectionUpdate();
	window.close();
}

function handlePoisSelection(){
	opener.pois_selection[0] = document.all.poi_kindergartens.checked;
	opener.pois_selection[1] = document.all.poi_gasstations.checked;
	opener.pois_selection[2] = document.all.poi_schools.checked;
	opener.pois_selection[3] = document.all.poi_fastfood.checked; //n
	opener.pois_selection[4] = document.all.poi_restaurants.checked;
	opener.pois_selection[5] = document.all.poi_doctors.checked;
	opener.pois_selection[6] = document.all.poi_pharmacies.checked;
	opener.pois_selection[7] = document.all.poi_pubs.checked; //n
	opener.pois_selection[8] = document.all.poi_parking.checked; //n
	opener.pois_selection[9] = document.all.poi_atm.checked; //n

	//opener.pois_selection[0] = document.all.poi_kindergartens.checked;
	//opener.pois_selection[1] = document.all.poi_gasstations.checked;
	//opener.pois_selection[2] = document.all.poi_schools.checked;
	//opener.pois_selection[3] = document.all.poi_supermarkets.checked;
	//opener.pois_selection[4] = document.all.poi_restaurants.checked;
	//opener.pois_selection[5] = document.all.poi_doctors.checked;
	//opener.pois_selection[6] = document.all.poi_pharmacies.checked;
	//opener.pois_selection[7] = document.all.poi_hardwarestores.checked;

	opener.handlePoisSelectionUpdate();
	window.close();
}

function handleFeatureSelectionUpdate(){
	document.all.tr_feature_age.style.display = features_selection[0] ? 'block' : 'none';
	document.all.tr_feature_cars.style.display = features_selection[1] ? 'block' : 'none';
	document.all.tr_feature_households.style.display = features_selection[2] ? 'block' : 'none';
	//document.all.tr_feature_unemployment.style.display = features_selection[3] ? 'block' : 'none';
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);
}

function handlePoisSelectionUpdate(){
	document.all.tr_poi_kindergartens.style.display = pois_selection[0] ? 'block' : 'none';
	document.all.tr_poi_gasstations.style.display = pois_selection[1] ? 'block' : 'none';
	document.all.tr_poi_schools.style.display = pois_selection[2] ? 'block' : 'none';
	document.all.tr_poi_fastfood.style.display = pois_selection[3] ? 'block' : 'none';
	document.all.tr_poi_restaurants.style.display = pois_selection[4] ? 'block' : 'none';
	document.all.tr_poi_doctors.style.display = pois_selection[5] ? 'block' : 'none';
	document.all.tr_poi_pharmacies.style.display = pois_selection[6] ? 'block' : 'none';
	document.all.tr_poi_pubs.style.display = pois_selection[7] ? 'block' : 'none';
	document.all.tr_poi_parking.style.display = pois_selection[8] ? 'block' : 'none';
	document.all.tr_poi_atm.style.display = pois_selection[9] ? 'block' : 'none';
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);
}
