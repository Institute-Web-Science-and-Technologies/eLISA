var poi_cache = Array();

function poi_draw(poi_options, callback) {

	// check for missing POI data
	var urlsToLoad = new Array();
	for (var i=0; i<poi_options.length; i++) {
		var poi = poi_options[i];

		// add URL to load list and remove entry from poi options
		if (poi_cache[poi.id] == null) {
			urlsToLoad[poi_setup[poi.id].file] = poi;
			poi_options.splice(i--, 1);
		}
	}

	// prepare URLs for missing POI data
	var urlList = new Array();
	for (var i in urlsToLoad) { urlList.push(i); }

	// load and draw missing POI data
	loadFiles(urlList, function(xmlDoc, url, done) {
		var poi = urlsToLoad[url];
		poi_cache[poi.id] = parsePOIs(xmlDoc);
		drawPoiMarker(poi.id, poi.weight);

		// signal done when all POI data has been loaded
		if (done) { callback(); }
	});

	// draw cached POI data
	for (var i in poi_options) {
		var poi = poi_options[i];
		drawPoiMarker(poi.id, poi.weight);
	}

	// signal done if no more POIs are being loaded
	if (urlList.length == 0) {
		callback();
	}
}

function drawPoiMarker(id, weight) {
	// ignore POIs with zero weight
	if (weight == 0) return;

	// compute radius and intensity
	var maxRad = poi_setup[id].radius/ (1.1 * Math.pow(2, 16 - map.getZoom() - minZoom)) * (1-weight/2);
	var maxInt = poi_setup[id].intensity * weight;

	if (poi_cache[id] == null)
		log(id + ' has no points');

	drawGradientCircles(poi_cache[id], maxRad, maxInt);
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

