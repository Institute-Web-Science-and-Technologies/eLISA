<?php 
function a($urlplain){
	$url = urlencode($urlplain);
	echo '<a href="crossproxy.php?url=http://' . $url . '">';
}


function loadXML($urlplain){
$url = 'crossproxy.php?url=http://' . urlencode($urlplain) ;
echo '<script> var pageToLoad = $' . $url . ' </script>';
}

function loadlocalXML($urlplain){
$url = 'crossproxy.php?url=' . urlencode($urlplain) ;
echo '<script> var pageToLoad = $' . $url . ' </script>';
}
?>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<title>test jquery</title>
	<!-- jquery-framework einbinden, datei im gleichen ordner -->
		<script src="js/thirdparty/jquery-ui/js/jquery-1.7.2.min.js"></script>	
	<script src="js/thirdparty/jquery-ui/js/jquery-ui-1.8.21.custom.min.js"></script>	
 
	<!-- eigene javascript-datei für den eigenen js-code -->
	<script type="text/javascript" src="js/ajax.js"></script>
 
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
 
	<div id="navigation"> 
		<a href="text1.html">seite 1</a> |  <?php a("www.uni-koblenz-landau.de/koblenz"); ?> seite 2</a>
	</div>
 
	<div id="content">
		<p>Willkommen auf der Startseite!</p>
		<p> <?php a("www.bollerwagen.de"); ?> Link </a> </p>
		<p> <?php loadlocalXML("text.xml"); ?>
		<script> document.write(pageToLoad); </script>
		<p>
	</div>
 






</body>
</html>