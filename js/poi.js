var poi_cache = Array();

function poi_draw(poi_options, callback) {
	for (var i in poi_status)
	{
	// load and draw missing POI data
//debug	document.write(poi_status[i].id);
			var poitodraw = parsePOIsjson(poi_setup[poi_status[i].id].poijson);
			drawPoiMarker(poi_status[i].id, poitodraw, poi_status[i].weight);
   }

	// signal done if no more POIs are being loaded
   callback();
}

function drawPoiMarker(id, poitodraw, weight) {
	// ignore POIs with zero weight
	if (weight == 0) return;

	// compute radius and intensity
	var maxRad = poi_setup[id].radius/ (1.1 * Math.pow(2, 16 - map.getZoom() - minZoom)) * (1-weight/2);
	var maxInt = poi_setup[id].intensity * weight;

	if (poi_cache[id] == null)
		log(id + ' has no points');

	drawGradientCircles(poitodraw, maxRad, maxInt);
}

/*
* Draws gradient circles. Inspired by http://www.websitedev.de/temp/openlayers-heatmap-layer.html
* points: list of map coordinates of type OpenLayers.LonLat
* radius: defines the size of the gradient circle
* intensity: maximum gradient intensity [0..1]
*/
function drawGradientCircles(points, radius, intensity) {

	// drawing offset is defined by radius and offset between map's 0,0 coordinate and layer's 0,0 positon
	var someLoc = new OpenLayers.LonLat(0,0)   // map.getCenter() works as well
	var offsetX = radius - map.getViewPortPxFromLonLat(someLoc).x + map.getLayerPxFromLonLat(someLoc).x;
	var offsetY = radius - map.getViewPortPxFromLonLat(someLoc).y + map.getLayerPxFromLonLat(someLoc).y;

	var ctx = vectorLayer.renderer.canvas.canvas.getContext('2d');
	var grd = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
	grd.addColorStop(0.0, 'rgba(0, 0, 0, ' + intensity + ')');
	grd.addColorStop(1.0, 'transparent');

	for(var i=0, len=points.length, diameter = radius*2; i<len; i++) {
		var pos = map.getLayerPxFromLonLat(points[i]);

		ctx.fillStyle = grd;  // must be set anew in every loop
		ctx.translate(pos.x - offsetX, pos.y - offsetY);
		ctx.fillRect(0, 0, diameter, diameter);
		ctx.translate(offsetX - pos.x, offsetY - pos.y);
	}
}

function parsePOIs(xmlDoc) {
	var nodes = xmlDoc.getElementsByTagName('node');
	var points = new Array();
	for (var i=0, len=nodes.length; i<len; i++) {
		var lon = nodes[i].getAttribute('lon');
		var lat = nodes[i].getAttribute('lat');
		points.push(new OpenLayers.LonLat(lon, lat).transform(map.displayProjection,map.getProjectionObject()));
	}
	return points;
}

// Neue Version von parsePOIs, die von loadpoi.js eingelesene json-poi verwendet. Der Array wird als  Parameter jsonpoi übergeben (z.B. "poischool")
// die OpenLayer-Kartenpunkte werde zurückgegeben.
function parsePOIsjson(jsonpoi) {
	var points = new Array();
	for (var i=0; i<jsonpoi.length; i++) {
		try{
		   points.push(new OpenLayers.LonLat(jsonpoi[i].lng, jsonpoi[i].lat).transform(map.displayProjection,map.getProjectionObject()));
		} catch(e){
		}
	}
	return points;
}

