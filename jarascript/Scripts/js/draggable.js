$( function() {
    $( "#draggable" ).draggable({
      start: function( event, ui ) {
      	//console.log($( "#draggable" ).draggable( "instance" ));
        //console.log(event);
        console.log(ui);
      }
    });

    $("#box").on('mousedown', function(event){
		//event.stopPropagation();
	});

	//$( "#box" ).scroll(function( event ) {
   		//event.stopPropagation();  
   		//console.log("#box scroll");
	//});
} );
