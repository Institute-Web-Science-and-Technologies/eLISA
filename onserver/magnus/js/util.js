var req_queue = Array();

/*
* Loads external data asynchronously.
* Usage:
*   loadData('http://...', callback, options);
*   function callback(xmlDoc, options) { ... }
*/
function loadData(url, callback, options) {

	var jqXHR = $.ajax(url, {beforeSend: function(jqXHR) { jqXHR.overrideMimeType( 'text/xml; charset=UTF-8' ); }})
		.done(function(data, textStatus, jqXHR) { 
			req_queue.splice(jqXHR, 1);
			callback(data, options);
		})
		.fail(function(jqXHR, errType, errObj) {
			alert("Cannot load '" + url + "' [" + errType + "]\n" + errObj);
		});
	req_queue[jqXHR] = url;
	return jqXHR;
}

function isWaitingForData() {
	return req_queue.length != 0;
}

/**
* Loads multiple URIs.
*
* Parameters:
*   urlList -list of URIs to load.
*   callback - function which handles the request results (xmlDoc, url, done).
*              the done flag is 'true' if this was the last request; 'false' if there are pending requests.
*/
function loadFiles(urlList, callback) {

	var requests = new Array();
	for (var i in urlList) {
		// add URI to request queue
		requests.push(urlList[i]);

		// do ajax request
		$.ajax(urlList[i], {beforeSend: function(jqXHR) { jqXHR.overrideMimeType( 'text/xml; charset=UTF-8' ); }})
			.done(function(data, textStatus, jqXHR) {
				// remove request from request queue and handle result
				requests.splice(this.url, 1);
				callback(data, this.url, requests.length == 0);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				// remove request from request queue and print error
				requests.splice(this.url, 1);
				alert("Cannot load '" + this.url + "' [" + textStatus + "]\n" + errorThrown);
			});
	}
}

/**
* Extract polygon paths from a list of features.
*
* Parameters:
*   features - {Array(<OpenLayers.Feature.Vector>)} a list of vector features
*
* Returns:
*   {Array(Array(<OpenLayers.LonLat>))} list of polygon paths
*/
function extractPolygons(features) {

	if (features == null || features.length == 0)
		alert('Error: no features to extract');

	var polygons = new Array();

	// iterate through all features (OpenLayers.Feature.Vector with geometry)
	for (var i=0, len=features.length; i<len; i++) {
		var feature = features[i];

		// check feature
		if (!(feature instanceof OpenLayers.Feature.Vector))
			alert('Error: not a vector feature');
		if (feature.geometry == null || !(feature.geometry instanceof OpenLayers.Geometry.Collection))
			alert('Error: feature has no valid geometry');

		// get feature attributes (name, SB_NUMMER.value)
		var label = feature.attributes.name;
		var index = i+1;
		if (feature.attributes.SB_NUMMER != null) {
			if (feature.attributes.SB_NUMMER instanceof Object) {
				index=feature.attributes.SB_NUMMER.value<<0;
			} else {
				index=feature.attributes.SB_NUMMER<<0;
			}
		}

		// geometry is a Geometry.LineString (GPX) or a Geometry.Polygon, i.e. collection of Geometry.LinearRings (KML)
		var components = new Array();
		if (feature.geometry instanceof OpenLayers.Geometry.Polygon) {
			for (var j in feature.geometry.components) {
				components.push(feature.geometry.components[j].components);
			}
		} else {
			components.push(feature.geometry.components);
		}

		// convert all Geometry.Point lists to Geometry.LonLat
		var lonlatLists = polygons[index];
		if (lonlatLists == null) lonlatLists = new Array();
		for (var j in components) lonlatLists.push(points2LonLat(components[j]));
		polygons[index] = lonlatLists;
	}

	return polygons;
}

// Convert list of OpenLayers.Geometry.Point to OpenLayers.LonLat
function points2LonLat(points) {
	var lonlatList = new Array();
	for (var i in points) {
		lonlatList.push(new OpenLayers.LonLat(points[i].x, points[i].y));
	}
	return lonlatList;
}

/**
* Extract a polygon feature vector from XML data.
*
* Parameters:Enigmail
*   xmlDoc - xml content containing the polygon
*   tagName - the name of the location tag (GPX: 'trkpt')
*   style - feature style to use
*/
function createFeatureVector(xmlDoc, tagName, style) {
	var nodes = xmlDoc.getElementsByTagName(tagName);
	var points = new Array();
	for (var i=0, len=nodes.length; i<len; i++) {
		var lon = nodes[i].getAttribute('lon');
		var lat = nodes[i].getAttribute('lat');
		points.push(new OpenLayers.Geometry.Point(lon, lat));
	}
	var linearRing = new OpenLayers.Geometry.LinearRing(points).transform(map.displayProjection,map.getProjectionObject());;
	return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([linearRing]),null,style);
}

/**
* Extract a polygon path from XML data.
*
* Parameters:
*   xmlDoc - xml content containing the polygon
*   tagName - the name of the location tag (GPX: 'trkpt')
*/
function createPolygonPath(xmlDoc, tagName) {
	var nodes = xmlDoc.getElementsByTagName(tagName);
	var points = new Array();
	for (var i=0, len=nodes.length; i<len; i++) {
		var lon = nodes[i].getAttribute('lon');
		var lat = nodes[i].getAttribute('lat');
		points.push(new OpenLayers.LonLat(lon, lat).transform(map.displayProjection,map.getProjectionObject()));
	}
	return points;
}
