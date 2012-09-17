<?php
header('Content-Type: text/javascript');
?>


function test(){
<?php
//$url="http://open.mapquestapi.com/xapi/api/0.6/node%5Bamenity=pub%5D%5Bbbox=7.465428457808391,50.31548578150301,7.740086660922425,50.414037899703885%5D";

//$data = file_get_contents('http://open.mapquestapi.com/xapi/api/0.6/node[amenity=pub][bbox=-77.041579,38.885851,-77.007247,38.900881]');
//debug $data = file_get_contents('text.xml');
//$data = file_get_contents('http://www.overpass-api.de/api/xapi?node[amenity=pub][bbox=7.465428457808391,50.31548578150301,7.740086660922425,50.414037899703885]');


//$data = file_get_contents('http://www.w3schools.com/xml/note.xml');
//echo "document.write('<br>Anfang');"; 
//echo $data ;
//echo "document.write('<br>Ende');"; 

?>
}

function helloworld(){
<?php 
// Erzeugt per PHP ein Javascript, das Hello World ausgibt.
echo "document.write ('Hallo Welt')"; 
?>
}

function testZugriff(){
<?php
// Greift auf Tags und Attribute zu und gibt diese durch javascript aus
	if (file_exists('text.xml')) {
  	 $xml = simplexml_load_file('text.xml');

	echo "document.write('Anfang" ;
	echo "<br>";
	echo $xml->node[0]->tag[0];
	echo "<br>";
	echo $xml->node[0]->tag[1];
	echo "<br>";
	echo $xml->node[1]->tag[0];
	echo "<br>";
	echo $xml->node[0]->tag[2]['k'];
	echo "<br>ende');";

	} else {
   	exit('Konnte Datei nicht laden.');
	}
?>
}


<?php
// Liest aus einer OSM-xml und gibt diese als json in ein Javascript aus
// Dieses wird in eine json Variable geschrieben und als R�ckgabewert der dynamisch erzeugten JavaScript Funktion �bergeben.

// Neue Suchbegriffe k�nnen hier eingef�gt werden, m�ssen aber ein g�ltiges OSM-amenity haben.

$amenityarray = array("pub", "restaurant", "fastfood", "school", "kindergarten", "fuel", "parking", "doctors", "pharmacy", "atm");
foreach($amenityarray as $ame){

echo "function ".$ame."2json(){";

//debug $url="text.xml";
// debug $url='http://www.overpass-api.de/api/xapi?node[amenity=pub][bbox=7.465428457808391,50.31548578150301,7.740086660922425,50.414037899703885]';
$url="http://www.overpass-api.de/api/xapi?node[amenity=".$ame."][bbox=7.465428457808391,50.31548578150301,7.740086660922425,50.414037899703885]";
$data = file_get_contents($url);


//debug echo "document.write('<br>Anfang');" ;
// if (file_exists($url)) {
//  	 	$xml = simplexml_load_file($url);
  	 	$xml = simplexml_load_string($data);
  	 	// Wandle alle Nodes in ein Objekt um
  	 	echo "\nvar poi".$ame." = [";
	 	foreach ($xml->node as $node){
	 		echo "\n{";
			// Wandle wichtige Attribute in Name-Wert Paare um (mit Umbenennung)
			if($node[id]!='') echo "\n   \"id\":\"" . htmlentities($node[id]) . "\",";
			if($node[user]!='') echo "\n   \"created_by\":\"" . htmlentities($node[user]) . "\",";
			if($node[lat]!='') echo "\n   \"lat\":\"" . htmlentities($node[lat]) . "\",";
		   if($node[lon]!='') echo "\n   \"lng\":\"" . htmlentities($node[lon]) . "\",";
	 		
			// Wandle alle Tags in ein Name-Wert Paar um.
			foreach ($node->tag as $tag){
				echo "\n   \"" . htmlentities($tag['k']) . "\":\"" . htmlentities($tag['v'])  . "\",";
			}

			echo "\n},";
	 	}
	 	echo "];\n";

		echo "return (poi".$ame.");\n}\n\n";
//  	} else {
//   	exit('Konnte Datei nicht laden.');
//	}

//debug echo "\ndocument.write('<br>Ende');" ;
}
?>







