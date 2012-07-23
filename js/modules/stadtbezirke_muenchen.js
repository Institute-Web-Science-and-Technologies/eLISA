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
	};
	this.init = function(map) {
		// tooltip for administrative boundary names
		var hoverTooltip = new OpenLayers.Control.SelectFeature(this.sbm_layer, {
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
}

// add plugin to system
addPlugin(new plugin_sbm());	

//============================
// utility functions
//============================

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




