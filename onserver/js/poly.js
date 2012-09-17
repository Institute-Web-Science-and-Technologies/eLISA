function poly_draw(status) {
	if (status == null) {
		log('illegal feature status: ' + status);
		return;  // nothing to do
	}

	for (var i=0, len=polygons.length; i<len; i++) {
		var parts = polygons[i];
		var intensity = feature_status[i];
		if (intensity == null) {
			log('intensity is ' + intensity + ' for ' + i);
			continue;
		}
		for (j in parts) {
			drawPolyOnCanvas(vectorLayer, parts[j], intensity);
		}
	}
}

function drawPolyOnCanvas(layer, points, intensity) {

	// drawing offset is defined by radius and offset between map's 0,0 coordinate and layer's 0,0 positon
	var someLoc = new OpenLayers.LonLat(0,0)   // map.getCenter() works as well
	var offsetX = map.getViewPortPxFromLonLat(someLoc).x - map.getLayerPxFromLonLat(someLoc).x;
	var offsetY = map.getViewPortPxFromLonLat(someLoc).y - map.getLayerPxFromLonLat(someLoc).y;

	var ctx = layer.renderer.canvas.canvas.getContext('2d');
	ctx.beginPath();

	// iterate through all points of the polygon path
	for (var i=0, len=points.length; i<len; i++) {
		var pos = map.getLayerPxFromLonLat(points[i]);
		if (i==0) {
			ctx.moveTo(pos.x + offsetX, pos.y + offsetY);
		} else {
			ctx.lineTo(pos.x + offsetX, pos.y + offsetY);
		}
	}
	
	ctx.fillStyle = 'rgba(1, 0, 0, ' + intensity + ')'
	ctx.fill();
}

