function plugin_sbm(){
	this.sbm_layer = new OpenLayers.Layer.GML("Bezirke",
		"js/modules/stadtbezirke_muenchen.kml", { format: OpenLayers.Format.KML,
		style: OpenLayers.Util.extend(OpenLayers.Feature.Vector.style['default'],{ fillOpacity: 0, strokeColor: "#999999" }),
		displayInLayerSwitcher: false,
	});
	this.getLayer = function() {
		return this.sbm_layer;
	};
	this.getControlsHtml = function(){
		return null;
	}
}

// add plugin to system
addPlugin(new plugin_sbm());	