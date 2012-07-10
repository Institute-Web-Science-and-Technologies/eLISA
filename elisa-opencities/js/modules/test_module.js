function plugin_test(){
	this.getLayer = function() {
		return null;
	};
	this.handleUpdate = function(){
		//alert("test");
		//TODO
	}
	this.getControlsHtml = function(){
		var html = "<h5 style=\"font-size:12px;\"><a href=\"#\">Test Module</a></h5>";
		html += "<div style=\"font-size:11px;\">test</div>";
		return html;
	}
	
}

// add plugin to system
addPlugin(new plugin_test());	