// Angabe, durch was fehlende Einträge der originaldateien ersetzt werden sollen
var nantext= "Unbekannt";

// Gibt die Werte aus einem Dataset zurück. Das gingr auch durch direkten Zugriff, hier ist aber eine kleine Fehlerkorrektur möglich.
function data(dataset, district, column){
	if((district >= numDistricts(dataset))|| (column >= numColums(dataset))){
		return nantext;
	}
	if(dataset=="Bezirke2010tab"){
		return (Bezirke2010tab[district][column]=="unbekannt" ? nantext : Bezirke2010tab[district][column]);
	}
	if(dataset=="Bezirke2009tab"){
		return (Bezirke2009tab[district][column]=="unbekannt" ? nantext : Bezirke2009tab[district][column]);
	}
	if(dataset=="Bezirke2009singlehh"){
		return (Bezirke2009singlehh[district][column]=="unbekannt" ? nantext : Bezirke2009singlehh[district][column]);
	}
	if(dataset=="Bezirke2009paarehh"){
		return (Bezirke2009paarehh[district][column]=="unbekannt" ? nantext : Bezirke2009paarehh[district][column]);
	}
}


//Gibt die Anzahl der Bezirke eines Datensatzes zurück(inklusive[0] -> Beschriftung und dem letzten -> Nicht zuzuordnen
//@param dataset: Name des Datasets
function numDistricts(dataset){
	if(dataset=="Bezirke2010tab"){
		return (Bezirke2010tab.length);
	}else	if(dataset=="Bezirke2009tab"){
		return (Bezirke2009tab.length);
	}else	if(dataset=="Bezirke2009singlehh"){
		return (Bezirke2009singlehh.length);
	}else	if(dataset=="Bezirke2009paarehh"){
		return (Bezirke2009paarehh.length);
	}else return ("Not Found");
}

//Gibt die Anzahl der Spalten eines Datensatzes zurück; Alle Zeilen müssen gleiche Spaltenzahl haben.
//@param dataset: Name des Datasets
function numColums(dataset){
	if(dataset=="Bezirke2010tab"){
		return (Bezirke2010tab[0].length);
	}
	if(dataset=="Bezirke2009tab"){
		return (Bezirke2009tab[0].length);
	}
	if(dataset=="Bezirke2009singlehh"){
		return (Bezirke2009singlehh[0].length);
	}
	if(dataset=="Bezirke2009paarehh"){
		return (Bezirke2009paarehh[0].length);
	}
}

// Gibt zu einem Dataset das Jahr zurück; Default ist 2009.
function dataYear(dataset){
	if(dataset=="Bezirke2010tab"){
		return "2010";
	}
	if(dataset=="Bezirke2009tab"){
		return "2009";
	}
	if(dataset=="Bezirke2009singlehh"){
		return "2009";
	}
	if(dataset=="Bezirke2009paarehh"){
		return "2009";
	} else return "2009";
}


//Gibt einen Array mit den Einwohnern aller Bezirke zurück. Verfügbar für 2009 oder 2010.
//@param year: 2009 oder 2010
function einwohner(year){
	var einw = new Array();
	if(year=="2009"){
		for (i1=0; i1<Bezirke2009tab.length; i1++){
			einw[i1] = Bezirke2009tab[i1][3];
		}
		return einw;
	}else if(year=="2010"){
		for (i1=0; i1<Bezirke2010tab.length; i1++){
			einw[i1] = Bezirke2010tab[i1][3];
		}
		return einw;
	}else return "Nur Jahr 2009 oder 2010 verfügbar";
}

//Rechnet eine gegebene Zahl auf Anzahl pro Einwohner um.
//@param number: Umzurechnende Zahl
//@param year: 2009 oder 2010
//@param district:
function zahlProEinwohner(number, year, district){
	var p;
	p=einwohner(year)[district];
	return number/p;
}

//Gibt zu einer gesamten Spalte die Zahlen pro Einwohner zurück. Vorsicht, wenn das schon pro Einwohner ist,  wird es nochmal verarbeitet!
//Das erste Element wird als Beschreibung betrachtet und um den String " pP"erweitert.
//@param numbers: Array[] mit den umzuwandelnden Zahlen
//@param year: 2009 oder 2010
function spalteProEinwohner(numbers, year){
	var n= new Array;
	n[0]= "" + numbers[0] + " pP";
	for(var i1=1; i1<numbers.length; i1++){
		n[i1]=zahlProEinwohner(numbers[i1],year,i1);
	}
	return n;
}


//Gibt zu einer gesamten Spalte eines bestimmten dataset die Zahlen pro Einwohner zurück. Vorsicht, wenn das schon pro Eeinwohner ist,  wird es nochmal verarbeitet!
//Die erste Zeile (Beschriftung) wird übersprungen.
//@param dataset: Ein in data(dataset, district, column) bekanntes Dataset
//@param column: Spalte im Dataset mit den umzuwandelnden Zahlen
function spalteDSProEinwohner(dataset, column){
	var n= new Array;
	n[0]="" + data(dataset,0,column) + [" pP"];
		for(var i1=1; i1<numDistricts(dataset); i1++){
			d=data(dataset,i1,column);
			if(isFinite(d)){
				n[i1]=zahlProEinwohner(d,dataYear(dataset),i1);
			}else {
				n[i1][column]=d;
			}
		}
	return n;
}


//Berechnet zu einem kompletten Dataset die Anzahl pro Einwohner. An die Einträge der ersten Zeile wird ein " pP" engehängt. In der restlichen Tabelle werden Strings direkt aus den Originaldaten kopiert.
//@param dataset: Das umzuwandelnde Dataset
function datasetProEinwohner(dataset){
	var n= new Array;
	n[0]=new Array;
		for(var i1=0; i1<numColums(dataset);i1++){
			n[0][i1]="" + data(dataset,0,i1) + [" pP"];
		}
		for(i1=1; i1<numDistricts(dataset); i1++){
			n[i1]=new Array();
			for(i2=0; i2<numColums(dataset); i2++){
				d=data(dataset,i1,i2);
				if(isFinite(d)){
					n[i1][i2]=zahlProEinwohner(d,dataYear(dataset),i1);
				}else {
					n[i1][i2]=d;
				}
			}
		}
	return n;
}


function normalize(dataset, numOfDistricts, column){
    var table;
	if(dataset=="Bezirke2010tab"){
	    table = Bezirke2010tab;
	}
	if (dataset=="Bezirke2009tab"){
	     table = Bezirke2009tab;
	}
	if(dataset=="Bezirke2009singlehh"){
	    table = Bezirke2009singlehh;
	}
 	if(dataset=="Bezirke2009paarehh"){
	    table = Bezirke2009paarehh;
	}
	var maxValue = Number.MIN_VALUE;
	var minValue = Number.MAX_VALUE;
	for (i=0; i < numOfDistricts ; i++) {
	       if (table[i][column] < minValue){
		    minValue = table[i][column];
		}
                if (table[i][column] > maxValue){
                           maxValue = table[i][column];
		}
	   }
	    var maxDiff = maxValue - minValue;
	    var tableNormalized = new Array();

	    for (i=0; i<mumOfDistricts; i++) {
		var delta = table[i][column] - minValue;
                tableNormalized[i][column] = table[i][column] * 100 / delta;
	    }
	    return tableNormalized;
}
