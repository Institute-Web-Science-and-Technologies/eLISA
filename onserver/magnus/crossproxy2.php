<?php
/* Script by DI4V0L0 (www.dug-portal.com) */

//--------EINSTELLUNGEN-----------------------------------//

$utf8 = 0; // UTF8 DECODE (0 = OFF / 1 = ON)
$url = "http://google.de/"; // URL
$target = 0; // TARGET (0 = OFF / 1 = ON)
// Website url to open
// $url = 'http://open.mapquestapi.com/xapi/api/0.6/node[amenity=pub][bbox=-77.041579,38.885851,-77.007247,38.900881]';
//  $url = 'text.xml';
//    $url = 'http://liveandgov.eu';
  $url = "http://google.de/"; // URL
//  $url = 'http://open.mapquestapi.com/xapi/';

//--------------------------------------------------------//

getContent($url);


function getContent($url){
	if ($target == 1) {
	$onoff = "_blank";
	} else {
	$onoff = "_self";
	}

	$inc = file_get_contents($url);

	$str = array("<head>");

	$etr = array("<head>\n<base href=\"$url\">\n<base target=\"$onoff\">");

	$result = str_replace($str, $etr, $inc);

	if ($utf8 == 1) {
	echo utf8_decode($result);
	} else {
	echo $result;
	}
}

?>