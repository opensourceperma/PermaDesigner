/**
 * @author Averos
 */

	/*
	 *	Save settings for each layout to hash-vars for easier-to-read code
	 */

	// options for layout that wraps the tab buttons & panels
	var pageLayoutSettings = {
		name:						"pageLayout"
	,	north__paneSelector:		"#tabButtons"
	,	center__paneSelector:		"#tabPanels"
	,	south__paneSelector:		"#pageFooter"
	,	spacing_open:				0
	//	center panel contains a Tabs widget, with a layout inside 1 or more tab-panels
	,	center__onresize:			$.layout.callbacks.resizeTabLayout
	};

	// options for a 2-level layout _inside_ tab-panel #1
	var tabLayoutSettings = {
		name:						"tabLayout"
	,	initPanes:					false // delay layout init until tab.show calls tabLayout.resizeAll()
	,	resizeWithWindow:			false // needed because 'nested' inside the tabLayout div
	,	center__paneSelector:		".middle-center"
	,	west__paneSelector:			".middle-west"
//	,	east__paneSelector:			'none' //".middle-east"
	,	north__paneSelector:  		".middle-north"
//  ,	south__paneSelector:  		'none' //".middle-south"
	,	contentSelector:			".ui-widget-content"
	,	spacing_open:				4
	,	spacing_closed:				4
	,	north__minSize:				20
	,	north__spacing_open:		0
	,   north__spacing_close:		0
	,	north__togglerLength_open:	0
	,	north__togglerLength_close:	-1
	,	north__resizable:			false
	,	north__slidable:			false
	,	north__fxName:				'none'
	,	west__size:					200
	//,	west__initClosed:			true
	,	south__minSize:				5
	,	south__size:				'auto'
	,	south__togglerLength_open:	0
	,	south__togglerLength_close:	-1
	,	south__resizable:			false
	,	south__slidable:			false
	,	south__spacing_open:		1
	//	options for 2nd-level layout nested inside center-pane of tab-layout
    ,	center__childOptions: {
			name:						"innerLayout"
		,	center__paneSelector:		".inner-center"
//		,	west__paneSelector:			'none' //".inner-west"
//		,	east__paneSelector:			'none' //".inner-east"
//		,	north__paneSelector:		'none' //".inner-north"
		,	contentSelector:			".ui-widget-content"
//		,	west__initClosed:			true
//		,	east__initClosed:			true
		,	spacing_open:				4
		,	spacing_closed:				4
//		,	west__size:					361
//		,	east__size:					250
//		,	east__fxSpeed:				'slow'
//		,	north__minSize:				15
//		,	north__spacing_open:		0
//		,	north__togglerLength_open:	50
//		,	north__togglerLength_close:	-1
		}
		
	};
    /* Tree example data*/
    var data = [
    {
        label: 'Weather',
        children: [
        ]
    },
    {
        label: 'Species',
        children: [
            { label: 'child3' }
        ]
    },
     {   label: 'Flow',
        children: [
           
        ]
    }
   ];
   
   
	function addCosmeticStyles () {
		// add cosmetic Theme styles dynamically so HTML mark-up is easier to read
		// except the ui-widget-content classes, which are hard-coded because used as Layout selectors
		$('#GuildWorkbench').children().not('#innerLayout')
			.addClass('ui-widget')
				.find('>:eq(0)').addClass('ui-widget-header').end()
				//.find('>:eq(1)').addClass('ui-widget-content').end() - hard-coded
				.find('>:eq(2)').addClass('footer ui-widget-header')
		;
		$('#innerLayout').children()
			.addClass('ui-widget')
				.find('>:eq(0)').addClass('ui-widget-header').end()
				//.find('>:eq(1)').addClass('ui-widget-content').end() - hard-coded
		;
	//	$('#pageFooter').addClass('ui-widget-header')
	};


	/*
	 *	init page onLoad
	 */
	$(document).ready(function () {

		// create the tabs before the page layout because tabs will change the height of the north-pane
		$("#tabs").tabs({
			// using callback addon
			show: $.layout.callbacks.resizeTabLayout

			/* OR with a custom callback
			show: function (evt, ui) {
				$.layout.callbacks.resizeTabLayout( evt, ui );
				// other code...
			}
			*/
		});

		// add UI classes for cosmetics -- before creating layouts because may change element heights
	//	addCosmeticStyles();
        
		// create the outer/page layout
		$('body').layout( pageLayoutSettings );

		// init #GuildWorkbench tabLayout - will only partially init if tab is 'hidden'
		 $('#GuildWorkbench').layout( tabLayoutSettings );
		
		
	//	tabLayoutSettings.center__childOptions.name="LWinnerLayout";
		
        $('#LayoutWorkbench').layout( tabLayoutSettings );
        
        var $GuildToolbar = $('#GuildToolbar');
        $GuildToolbar.children().button();
        
       //This function will check for permaworkspacedb. If not found, it will create it with workspace_species and workspace_flow object stores
       init_permaworkspacedb();
       
       //This function will disable all buttons except for the ones required to start new workspace or open an existing perma file
       //init_workbenchcontrols();
       
       //This function will create necessary dialog boxes and create their respective event bindings
       //init_dialog();
       
       var dlgheight =  screen.availHeight * 0.85;
       var dlgwidth =  screen.availWidth * 0.65; 
  
       $('#SearchDialog').dialog({autoOpen: false,
       	                        dialogClass: 'SearchDialog',
       	                        height: dlgheight,
                                width: dlgwidth,  
                                minHeight: dlgheight/2,
                                minWidth: dlgwidth/2,
                                modal: true,
                                buttons:[{
                                	       text:'Search',class:'DialogBtn',click:function(){
                                	       	searchspecies();
                                	       	
                                	       }
                                	      },
                                	     {
                                	       text:'Add',class:'DialogBtn',click:function(){}
                                	      },
                                	     {
                                	       text:'Cancel',class:'DialogBtn',click:function(){
                                	     	                                                $( this ).dialog( "close" );
                                	     	                                              }
                                	      }                                 	    
                                	    ],
                                 open: function(){
                                 	 
                                 	$(this).find('input:text').val('');
                                 	$('.MatchedResult').remove();
                                 	
                                 	
                                 }
                                
                                 });
        
    
        
        $('#SpeciesBtn').button().click(function() {
       
          $('#SearchDialog').dialog('open');
        });

       
        createshapeinstance('chicken');
        createshapeinstance('duck');
        
   
    
   jsPlumb.connect( { 
   source:'chicken',
   target:'duck' ,
   paintStyle:{strokeStyle:'blue', lineWidth:6 },
   endpointStyle:{ fillStyle:'blue'},
   anchors:['RightMiddle', 'LeftMiddle' ],
   overlays:[[ 'Label', { cssClass:'connectorlabel',label:'Edit Flow'} ]]
  
   
   });
   
  
   $('#guildtree').tree({
        data:data
    });
  
  
        
	}); // end of ready function

function init_permaworkspacedb(){
	
    window.indexedDB = window.indexedDB || window.webkitIndexedDB;
    
      if(window.indexedDB){
      
      var permanamespace = {}; //may need this if domain is required for indexedDB to work 
	  var dbname= "permaworkspacedb";
	  permanamespace.indexedDB = {};
	  permanamespace.indexedDB.permaworkspacedb = null;
      
      //for testing delete db
 //     var dbdrequest = indexedDB.deleteDatabase(dbname);
  //   dbdrequest.onsuccess =function(event){
  //    	alert('deleted database..proceeding');
      var dborequest = indexedDB.open(dbname,1);
      
      dborequest.onupgradeneeded = function (event){  	
        	permanamespace.indexedDB.permaworkspacedb = event.target.result;
        	var permaworkspacedb= permanamespace.indexedDB.permaworkspacedb;
        	try{
        	var speciesworkspaceobjstore = permaworkspacedb.createObjectStore("species_workspace",{keyPath:"snm"});
        	var flowworkspaceobjstore = permaworkspacedb.createObjectStore("flow_workspace",{keyPath:"flowid"});
        	alert('species_workspace and flow_workspace object stores created');
  //      	permaworkspacedb.close(); 
  //      	return;
        	}
        	catch(err)
        	{alert('Unable to create workspace object stores:'+err.message); 
        	  window.location='index.html';
        	}
       };
        
        dborequest.onsuccess = function(event) {
        	permanamespace.indexedDB.permaworkspacedb = event.target.result;
        	var permaworkspacedb= permanamespace.indexedDB.permaworkspacedb;
   //     	alert('successful now i can try and close db');
        	  permaworkspacedb.close();
        };
        
        dborequest.onerror = function(event) {
           alert("Unable to open permaworkspacedb: "+dborequest.error.name);
           window.location='index.html';
          };
        
 // for debugging with delete db request      }
     }
	 else{
			 alert('indexedDb is not supported by this browser');
		     window.location='index.html';
	 }	
	
}// end init_permaworkspacedb






function searchspecies(){
	var index=1;
	var result = "<div class='MatchedResult' id='result"+index+"'>"+ $('#speciesnameinput').val()+"</div>";
	
//	alert(result);
	$('.MatchedResult').remove();
	$(result).appendTo('#SearchResult');
}




function createshapeinstance(shapeid){
	  
        var shape = createshapehtml(shapeid);
        
        $(shape).appendTo('#guilddrawpane');

        var newwidth;
        var newheight;
        
       jsPlumb.draggable($("#"+shapeid),{ stack: ".speciesshape",
        	                              cancel: "#"+shapeid+"infobtn"+","+
                                          		  "#"+shapeid+"restorebtn"+","+
                                                  "#"+shapeid+"output"+","+
                                                  "#"+shapeid+"input"});
     
        $("#"+shapeid).resizable({
        	resize: function(event, ui)
                {
                	jsPlumb.repaint(ui.helper);
                	newwidth = ((ui.size.width-1)/2);
                	newheight = (ui.size.height-55);
                	
    	            $("#"+shapeid+"output").css({"height":newheight+"px","width":newwidth+"px"});
    	            $("#"+shapeid+"input").css({"height":newheight+"px","width":newwidth+"px"});
                }
        	       	
        });
	
	
}




var imagepath = "resources/css/images/";

function createshapehtml(shapeid){

 var inputelementhtml = "<div class='inputelement'><p>water</p></div>"+
                        "<div class='inputelement'><p>feed</p></div>"+
                        "<div class='inputelement'><p>temperature</p></div>"+
                        "<div class='inputelement'><p>air</p></div>";  
  
 var ouputelementhtml = "<div class='outputelement'><p>egg</p></div>"+
                        "<div class='outputelement'><p>feather</p></div>"+
                        "<div class='outputelement'><p>meat</p></div>"+
                        "<div class='outputelement'><p>nitrates</p></div>";
                        
  var shapehtml = "<div id='"+shapeid+"' class='speciesshape' class='ui-state-active' >"+
                                         "<div class='shapeheader'>"+
                                         shapeid+
                                         "<div  id='"+shapeid+"infobtn' class='shapecontrolbtn' type='submit'><image src="+imagepath+"info.png></div>"+
                                         "<div  id='"+shapeid+"restorebtn' class='shapecontrolbtn' type='submit'><image src="+imagepath+"restore.png></div>"+
                                         "</div>"+
                                         
                                         "<table class='shapecontenttable' border='1' cellpadding='0'>"+
                                         
                                         "<tr class='gridheader'>"+"<th width='50%'>Input</th>"+"<th width='50%'>Output</th>"+"</tr>"+
                                         
                                         "<tr class='gridcontent'>"+                                         
                                         "<td width='50%'>" +"<div id='"+shapeid+"input' class='shapeinnerscroll' >"+inputelementhtml+"</div>"+"</td>"+
                                         "<td width='50%'>" +"<div id='"+shapeid+"output' class='shapeinnerscroll' >"+ouputelementhtml+"</div>"+"</td>"+
                                         "</tr>"+
                                         
                                         "</table>"+  
                "</div>" ;
return shapehtml	
}
