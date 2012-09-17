function computeHeatmap(srcLayer, dstLayer, gradient) {

	var mapSize = map.getSize();
	var imgData = vectorLayer.renderer.canvas.getImageData(0, 0, mapSize.w, mapSize.h);
	var pix = imgData.data;

	for (var i = 0, n = pix.length; i < n; i++) {
		var alphaIdx = pix[i+3]<<2;     // 'rgba': 4th value in scr, *4 in gradient
		pix[i++]=gradient[alphaIdx++];  // red
		pix[i++]=gradient[alphaIdx++];  // green
		pix[i++]=gradient[alphaIdx++];  // blue
		pix[i] >>= 1;                   // scale to maximum of 128
	}

	heatmapLayer.renderer.canvas.putImageData(imgData, 0, 0);
}

function createColorGradient(colorSchema) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = 256;
	canvas.height = 1;

	var grd = ctx.createLinearGradient(0, 0, 255, 0);
	for (var i in colorSchema) {
		grd.addColorStop(colorSchema[i][0], colorSchema[i][1]);
	}

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0 , 256, 1);

	return ctx.getImageData(0, 0, 256, 1).data;
}
