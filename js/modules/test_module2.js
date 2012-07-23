function plugin_test(){
	this.getLayer = function() {
		return null;
	};
	this.handleUpdate = function(){
		//alert("test");
		//TODO
	}
	this.getControlsHtml = function(){
		var html = "<h5 style=\"font-size:12px;\"><a href=\"#\">Test Module 2</a></h5>";
		html += "<div style=\"font-size:11px;\">test2</div>";
		return html;
	}
	this.init = function(map) {
		// do further init stuff on the map
	}	
}

// add plugin to system
addPlugin(new plugin_test());	