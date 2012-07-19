// voronoi extension
function plugin_voronoi(){
	this.getLayer = function() {
		var x = OpenLayers.Class(
			new OpenLayers.Layer.EventPane("TestLayer", {}),
			new OpenLayers.Layer.FixedZoomLevels(),
			{}
		);
		return x;
		
	};
	this.handleUpdate = function(){}
	
	this.getControlsHtml = function(){
		return "<h5 style=\"font-size:12px;\"><a href=\"#\">Voronoi</a></h5>"
			+ "<div style=\"font-size:11px;\">test</div>";
	}
}
// add plugin to system
addPlugin(new plugin_voronoi());