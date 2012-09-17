// code direkt nach seitenaufbau starten
$(document).ready(function()
{
	// allen links im div 'navigation' & 'content' eine click()-funktion zuweisen.
	// es wird auch auf alle links von der dynamisch nachgeladenen
	// seiten reagiert (solange die seiten in das content-div geladen werden)!
	$("#navigation a, #content a").live("click",function()
	{
		// das link-ziel jeweils auslesen & zwischenspeichern
		var pageToLoad = $(this).attr("href");
 
		// dem div 'content' den inhalt der aufgerufenen seite zuweisen
		$("#content").load(pageToLoad);
 
		// wichtig! sonst wird der a-link im browser aufgerufen!
		return false;
	});
});