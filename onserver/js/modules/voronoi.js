// voronoi extension
var x;
function plugin_voronoi(){
	this.getLayer = function() {
		x = new OpenLayers.Layer.Vector(
			"TestLayer",
			{renderers:["Canvas"]}
		);		
		
		return x;
		
	};
	this.handleUpdate = function(){
	}
	
	this.getControlsHtml = function(){
		var html = '<h5 style="font-size:12px;"><a href="#">Voronoi</a></h5>'
			+ '<div style="font-size:11px;"><input name="voronoi-generator" type="button" value="generate" /></div>';
			
		jQuery("input[name=voronoi-generator]").click(function(){console.log("pew")});
		
		return html;
	}
}
// add plugin to system
addPlugin(new plugin_voronoi());