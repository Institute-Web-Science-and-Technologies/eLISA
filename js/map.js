var GRADIENT_LISA = [
	[0.00, 'rgba(  0,   0, 255,   0)'],
	[0.25, 'rgba(  0, 255, 255,  64)'],
	[0.50, 'rgba(  0, 255,   0, 128)'],
	[0.75, 'rgba(255, 255,   0, 192)'],
	[1.00, 'rgba(255,   0,   0, 255)']
];

var GRADIENT_GHEAT = [
	[0.00, 'rgba(255, 255, 255, 0)'],
	[0.05, '#35343d'],
	[0.15, '#050555'],
	[0.30, '#00eaf2'],
	[0.45, '#00b441'],
	[0.60, '#dcfc05'],
	[0.80, '#ff0101'],
	[1.00, '#ffeded']
];

// global map object of type OpenLayers.Map
var map;

// global vector layer object of type OpenLayers.Layer.Vector
var vectorLayer;
var heatmapLayer;
var minZoom = 12;
var maxZoom = 17;

var polygons = new Array();
var heatmapGradient = null;

function map_init() {

	heatmapGradient = createColorGradient(GRADIENT_LISA);

	// hard coded map extend of Koblenz (7.483 E, 50.283 N, 7.696 E, 50.410 N) ["EPSG:4326" -> "EPSG:900913"]
	// alert(new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")));
	var extent = new OpenLayers.Bounds(833000, 6495400, 856700, 6517600);

	// create map with controls and restricted extend
	map = new OpenLayers.Map ("map", {
		controls:[
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoomBar(),
			new OpenLayers.Control.LayerSwitcher(),
			new OpenLayers.Control.KeyboardDefaults()
		],
// this restriction covers some part of Koblenz by the control panel. We shold find a better boundary. in the meantime, the restriction is deactivated.
//		restrictedExtent: extent,  // set maximum map boundaries
		displayProjection: new OpenLayers.Projection("EPSG:4326")
	} );

	// register listener for map move and zoom events
	map.events.register('moveend', undefined, function() {
		drawLayers();
	});

	// create all tile map layers
	gmapLayer = new OpenLayers.Layer.Google("Google Streets", {minZoomLevel: minZoom, maxZoomLevel: maxZoom});
	gsatLayer = new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, minZoomLevel: minZoom, maxZoomLevel: maxZoom});
	osmLayer = new OpenLayers.Layer.OSM.Mapnik("OpenStreetMap", {
		zoomOffset: minZoom,  // limitation of osm zoom as described in http://forum.openstreetmap.org/viewtopic.php?pid=175840#p175840
		resolutions: [38.2185141357422,19.1092570678711,9.55462853393555,4.77731426696777,2.38865713348389,1.19432856674194]
	} );

	// create vector layers (polygons, POIs, and heatmap)
	vectorLayer = new OpenLayers.Layer.Vector("Features", {renderers: ["Canvas"], displayInLayerSwitcher: false, visibility: false});
	heatmapLayer = new OpenLayers.Layer.Vector("Heatmap", {renderers: ["Canvas"], displayInLayerSwitcher: false});
	polyLayer = new OpenLayers.Layer.GML("Bezirke",
		"Geodaten/OSM_Koblenz_bezirke.kml", { format: OpenLayers.Format.KML,
		style: OpenLayers.Util.extend(OpenLayers.Feature.Vector.style['default'],{ fillOpacity: 0, strokeColor: "#999999" }),
		displayInLayerSwitcher: false
	});

	// extract polygon path when all features have been added to layer
	polyLayer.events.register('featuresadded', undefined, function(event) {
		polygons = extractPolygons(event.features);
		drawLayers();
	});

	// add all layers to map and update map view
	map.addLayers([osmLayer, gmapLayer, gsatLayer, vectorLayer, heatmapLayer, polyLayer]);
	map.zoomToExtent(extent);

	// tooltip for administrative boundary names
	var hoverTooltip = new OpenLayers.Control.SelectFeature(polyLayer, {
		hover: true,
                highlightOnly: true,
		selectStyle: {
			fillOpacity: 0.1,
			strokeWidth: 2.5,
			strokeColor: "#999999" },
                eventListeners: {
                    featurehighlighted: showQtip
                }
		});
	hoverTooltip.handlers['feature'].stopDown = false;
	hoverTooltip.handlers['feature'].stopUp = false;
	map.addControl(hoverTooltip);
	hoverTooltip.activate();
}

function showQtip(olEvent){
        var elem = document.getElementById(olEvent.feature.geometry.id);

	$(elem).qtip({
		content: olEvent.feature.attributes.name,
		overwrite: false,
		style: { name: 'dark' },
		show: { delay: 100, ready: true },
		position: { target: 'mouse', adjust: { x: 10, y: 8, mouse: true } }
	})
	.qtip('show');
}

var drawingInProgress = false;

function drawLayers() {
	if (drawingInProgress)
		return;

	drawingInProgress = true;
	clearCanvas([vectorLayer]);
	poly_draw(feature_status);

	poi_draw(poi_status, function() {
		clearCanvas([heatmapLayer]);
		computeHeatmap(vectorLayer, heatmapLayer, heatmapGradient);
		drawingInProgress = false;
	});
}

function clearCanvas(layers) {

	for (var i=0, len=layers.length; i<len; i++) {
		var canvas = layers[i].renderer.canvas.canvas;
		var ctx = canvas.getContext('2d');

		ctx.save(); // Workaround for a bug in Google Chrome
		ctx.fillStyle = 'transparent';
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
	}
}

