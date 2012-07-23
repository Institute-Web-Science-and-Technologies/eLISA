function plugin_lokalitaeten(){
	this.getLayer = function() {
		return null;
	};
	this.handleUpdate = function(){
		//alert("test");
		//TODO
	}
	this.getControlsHtml = function(){
		var html = "<h5 style=\"font-size:12px;\"><a href=\"#\">Lokalit&auml;ten</a></h5>";
		html += "<div style=\"font-size:11px;\">";
		html += sliderControlHtml("Restaurants",0,100,10,40,this.handleUpdate);
		html += sliderControlHtml("&Auml;rzte",0,100,10,40,this.handleUpdate);
		html += sliderControlHtml("Tankstellen",0,100,10,40,this.handleUpdate);
		html += "</div>";
		return html;
	}
	this.init = function(map) {
		// do further init stuff on the map
	}
}

// add plugin to system
addPlugin(new plugin_lokalitaeten());	