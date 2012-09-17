var slider_features;
var slider_pois;

/**
 * @deprecated
 */
function slider_init(){	
//	document.all.main_div.innerHTML = getMap();
	handleFeatureSelectionUpdate();
	handlePoisSelectionUpdate();

	slider_features = Array(4);
			
	slider_features[0] = YAHOO.widget.Slider.getHorizSlider("slider_feature_age", "sliderthumb_feature_age", 0, 200);
	slider_features[0].subscribe('slideEnd', function(){ handleSliderChange(slider_features[0], "feature", 0); });
	slider_features[0].setValue(100);
	slider_features[1] = YAHOO.widget.Slider.getHorizSlider("slider_feature_cars", "sliderthumb_feature_cars", 0, 200);
	slider_features[1].subscribe('slideEnd', function(){ handleSliderChange(slider_features[1], "feature", 1); });
	slider_features[1].setValue(100);
	slider_features[2] = YAHOO.widget.Slider.getHorizSlider("slider_feature_households", "sliderthumb_feature_households", 0, 200);
	slider_features[2].subscribe('slideEnd', function(){ handleSliderChange(slider_features[2], "feature", 2); });
	slider_features[2].setValue(100);
//	slider_features[3] = YAHOO.widget.Slider.getHorizSlider("slider_feature_unemployment", "sliderthumb_feature_unemployment", 0, 200);
//	slider_features[3].subscribe('slideEnd', function(){ handleSliderChange(slider_features[3], "feature", 3); });
//	slider_features[3].setValue(100);
	
	slider_pois = Array(8);
	
	slider_pois[0] = YAHOO.widget.Slider.getHorizSlider("slider_poi_kindergartens", "sliderthumb_poi_kindergartens", 0, 200);
	slider_pois[0].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[0], "poi", 0); });
	slider_pois[1] = YAHOO.widget.Slider.getHorizSlider("slider_poi_gasstations", "sliderthumb_poi_gasstations", 0, 200);
	slider_pois[1].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[1], "poi", 1); });
	slider_pois[2] = YAHOO.widget.Slider.getHorizSlider("slider_poi_schools", "sliderthumb_poi_schools", 0, 200);
	slider_pois[2].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[2], "poi", 2); });
	slider_pois[3] = YAHOO.widget.Slider.getHorizSlider("slider_poi_supermarkets", "sliderthumb_poi_supermarkets", 0, 200);
	slider_pois[3].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[3], "poi", 3); });
	slider_pois[4] = YAHOO.widget.Slider.getHorizSlider("slider_poi_restaurants", "sliderthumb_poi_restaurants", 0, 200);
	slider_pois[4].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[4], "poi", 4); });
	slider_pois[5] = YAHOO.widget.Slider.getHorizSlider("slider_poi_doctors", "sliderthumb_poi_doctors", 0, 200);
	slider_pois[5].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[5], "poi", 5); });
	slider_pois[6] = YAHOO.widget.Slider.getHorizSlider("slider_poi_pharmacies", "sliderthumb_poi_pharmacies", 0, 200);
	slider_pois[6].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[6], "poi", 6); });
	slider_pois[7] = YAHOO.widget.Slider.getHorizSlider("slider_poi_hardwarestores", "sliderthumb_poi_hardwarestores", 0, 200);
	slider_pois[7].subscribe('slideEnd', function(){ handleSliderChange(slider_pois[7], "poi", 7); });
}

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
	opener.pois_selection[3] = document.all.poi_supermarkets.checked;
	opener.pois_selection[4] = document.all.poi_restaurants.checked;
	opener.pois_selection[5] = document.all.poi_doctors.checked;
	opener.pois_selection[6] = document.all.poi_pharmacies.checked;
	opener.pois_selection[7] = document.all.poi_hardwarestores.checked;
	opener.handlePoisSelectionUpdate();
	window.close();
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
	handleUpdate(features, features_labels, features_selection, features_weight, pois, pois_labels, pois_selection, pois_weight);
}

function setPreset(preset){
	tmpSema = true;

	if(preset == 2){
		features_selection[0] = true;
		features_weight[0] = 0.7;
	 	slider_features[0].setValue(features_weight[0]*200);
	}else features_selection[0] = false;
	
	if(preset == 1){
		features_selection[1] = true;
		features_weight[1] = 0.1;
		slider_features[1].setValue(features_weight[1]*200);
	}else features_selection[1] = false;
	
	if( (preset == 1) || (preset == 3) ){
		features_selection[2] =  true;
		features_weight[2] = ((preset == 1) ? 0.8 : 0.9 );
		slider_features[2].setValue(features_weight[2]*200);
	}else features_selection[2] = false;
	
//	if(preset == 3){
//		features_selection[3] = true;
//		features_weight[3] = 0.7;
//		if(preset == 3) slider_features[3].setValue(features_weight[3]*200);
//	}else features_selection[3] = false;	
	
	pois_selection[0] = (preset == 1) || (preset == 3);
	pois_weight[0] = 0.8;
	if(preset == 1 || preset == 3) slider_pois[0].setValue(pois_weight[0]*200);
		
	pois_selection[1] = false;
	pois_weight[1] = 0;
	
	pois_selection[2] = (preset == 1) || (preset == 3);
	pois_weight[2] = 0.2;
	if(preset == 1 || preset == 3) slider_pois[2].setValue(pois_weight[2]*200);
		
	pois_selection[3] = (preset == 1);
	pois_weight[3] = 0.8;
	if(preset == 1) slider_pois[3].setValue(pois_weight[3]*200);

	pois_selection[4] = (preset == 2);
	pois_weight[4] = 0.8
	if(preset == 2) slider_pois[4].setValue(pois_weight[4]*200);

	pois_selection[5] = false;
	pois_weight[5] = 0;

	pois_selection[6] = (preset == 1); 
	pois_weight[6] = 0.1;
	if(preset == 1) slider_pois[6].setValue(pois_weight[6]*200);

	pois_selection[7] = false;
	pois_weight[7] = 0;
	
	tmpSema = false;
	
	handleFeatureSelectionUpdate();	
	handlePoisSelectionUpdate();
}