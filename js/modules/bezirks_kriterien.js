function plugin_bez(){
	this.getLayer = function() {
		return null;
	};
	this.handleUpdate = function(){
		//alert("test");
		//TODO
	}
	this.getControlsHtml = function(){
		var html = "<h5 style=\"font-size:12px;\"><a href=\"#\">Bezirkskriterien</a></h5>";
		html += sliderControlHtml("Altersdurchschnitt",0,100,10,40,this.handleUpdate);
		return html;
	}
	
}

// add plugin to system
addPlugin(new plugin_bez());	