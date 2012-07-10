var PLUGINS = new Array();
var MAP;

var minZoom = 11;
var maxZoom = 17;

function init(){
	var extent = new OpenLayers.Bounds(1264400, 6116700, 1305600, 6148600);

	// create map with controls and restricted extend
	MAP = new OpenLayers.Map ("map", {
		controls:[
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoomBar(),			
			new OpenLayers.Control.KeyboardDefaults()
		],
		restrictedExtent: extent,  // set maximum map boundaries
		displayProjection: new OpenLayers.Projection("EPSG:4326")
	} );
	
	// create all tile map layers
	osmLayer = new OpenLayers.Layer.OSM.Mapnik("OpenStreetMap", {
		zoomOffset: minZoom,  // limitation of osm zoom as described in http://forum.openstreetmap.org/viewtopic.php?pid=175840#p175840
		resolutions: [76.4370282714844,38.2185141357422,19.1092570678711,9.55462853393555,4.77731426696777,2.38865713348389,1.19432856674194]
	} );
	
	// add all layers to map and update map view
	MAP.addLayers([osmLayer]);
	MAP.zoomToExtent(extent);

	// load all modules
	var i = 0;
	while(i < files.length){
		loadjsfile(files[i]);
		i++;
	}
}

function addPlugin(plugin){
	PLUGINS.push(plugin);
	// register layers
	if(plugin.getLayer() != null)
		MAP.addLayer(plugin.getLayer());
	// add plugin controls
	if(plugin.getControlsHtml() != null){
		$( '#plugin_guis').append(plugin.getControlsHtml()).accordion("destroy").accordion({
			autoHeight: false,
			navigation: true,
			collapsible: true
		});		
	}	
}

function loadjsfile(filename){
	var oHead = document.getElementById('head');
	var oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.src = filename;
	oHead.appendChild(oScript);
}