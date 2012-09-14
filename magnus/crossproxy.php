<?php
// Set your return content type
//header('Content-type: application/xml');

// Website url to open
// $daurl = 'http://open.mapquestapi.com/xapi/api/0.6/node[amenity=pub][bbox=-77.041579,38.885851,-77.007247,38.900881]';
//  $remoteURL = 'text.xml';
//  $url = 'http://liveandgov.eu';
//  $url = "http://google.de/"; // URL
//  $remoteURL = 'http://open.mapquestapi.com/xapi/';
$url = $HTTP_GET_VARS["url"];
echo $url;
	$fp = fopen($url,"r");
	if ($fp)
	{
		while(!feof($fp))
	{
		$text = fgets($fp);
		echo"$text";
	}
		fclose($fp);
	}
?>