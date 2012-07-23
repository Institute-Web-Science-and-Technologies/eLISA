var slider_counter = 0;

function sliderControlHtml(label,min,max,step,value,handler){
	slider_counter++;
	return "<p>\
					<input type=\"checkbox\"/ checked=\"checked\" onclick=\"$( '#slider" + slider_counter + "' ).slider('option', 'disabled', !$( '#slider" + slider_counter + "' ).slider('option', 'disabled'));$( '#slider" + slider_counter + "' ).trigger('slide');\">&nbsp;<label for=\"amount" + slider_counter + "\">" + label + ":</label>\
					<input type=\"text\" id=\"amount" + slider_counter + "\" style=\"border:0; background:none; color:#f6931f; font-weight:bold;\" disabled=\"disabled\" />\
				</p>\
				<script>\
					$(function() {\
						$( \"#slider" + slider_counter + "\" ).slider({\
							value:" + value + ",\
							min: " + min + ",\
							max: " + max + ",\
							step: " + step + ",\
							slide: function( event, ui ) {\
								$( \"#amount" + slider_counter + "\" ).val( + ui.value );\
							}\
						});\
						$( \"#slider" + slider_counter + "\" ).bind(\"slide\", " + handler + ");\
						$( \"#amount" + slider_counter + "\" ).val( $( \"#slider" + slider_counter + "\" ).slider( \"value\" ) );\
					}); \
				</script>\
				<div id=\"slider" + slider_counter + "\"></div>";
}