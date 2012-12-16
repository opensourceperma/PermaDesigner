/**
 * @author Averos
 */

$(document).ready(function () {
	
	
	$('#configtab').tabs();
	$( "#configtab li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
	document.getElementById('dbfileinput').addEventListener('change', readandloaddbfile, false); 
	 
});

function readandloaddbfile(fileinputevent){
	
	var dbfilehandle = fileinputevent.target.files[0];
	
	if(dbfilehandle){

	var dbfilereader = new FileReader();
	
	dbfilereader.onload = function(readeronloadevent){	
  
	//debug string read from file
	//alert(readeronloadevent.target.result);
	
	try{
	    var dbjsonobj =	$.parseJSON(readeronloadevent.target.result);
	    //alert(dbjsonobj.species[1].snm);
	    
	    window.indexedDB = window.indexedDB || window.webkitIndexedDB;
	
	    if(window.indexedDB){
	      var permanamespace = {}; //may need this if domain is required for indexedDB to work 
	      var dbname= "permadb";
		  permanamespace.indexedDB = {};
		  permanamespace.indexedDB.permadb = null;
		
		  indexedDB.deleteDatabase(dbname);
		
		  var dborequest = indexedDB.open(dbname,1);
        
          dborequest.onerror = function(event) {
           alert("Unable to open permadb: "+dborequest.error.name);
           return;
          };
        dborequest.onupgradeneeded = function (event){  	
        	permanamespace.indexedDB.permadb = event.target.result;
        	var permadb= permanamespace.indexedDB.permadb;
        	var speciesobjstore = permadb.createObjectStore("species",{keyPath:"snm"});
        	alert('species object store created');
        }
        
        dborequest.onsuccess = function(event) {
           permanamespace.indexedDB.permadb = event.target.result;
           var permadb= permanamespace.indexedDB.permadb;
           var trans = permadb.transaction(["species"],"readwrite");
           var speciesobjstore = trans.objectStore("species");
           
  //         alert("dbstring before put:"+ JSON.stringify(dbjsonobj.species));
           try{
           	    for(var i in dbjsonobj.species)
                { speciesobjstore.put(dbjsonobj.species[i]);} 
                alert('done loading');
           }
           catch(err){alert('fucked up, put didnt work:'+err.message);}
     /*     
           sosrequest.onerror = function(event){
           alert("Unable to load into species store: "+sosrequest.error.name);	
           	
           }
           
           sosrequest.onsuccess = function(event){
           alert("Fuck Yeah, species store loaded ");	
           	
           }
           
    */
           //now fucking check for speciesobjectstore
          
           permadb.close(); 
           
           
        };
		  
		
	    }
		else{
			 alert('indexedDb is not supported by this browser');
		     return;
		 }
	}
	catch(err){
		alert(err.message);
		return;
	}
    }

    dbfilereader.readAsText(dbfilehandle);

   }
   else
   {alert('Unable to read selected file!');}

}