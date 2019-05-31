$( function() {
	$( "#box-parent" ).scroll(function( event ) {
   		//event.stopPropagation();  
   		console.log("#box-parent scroll");
	});
  $( "#box" ).scroll(function( event ) {
      //event.stopPropagation();  
      console.log("#box scroll");
  });
  document.getElementById("box-parent").addEventListener('wheel',
  function (event){
    event.stopPropagation();
    console.log("#box-parent wheel");
  });
  document.getElementById("box").addEventListener('wheel', 
  function (event){
    event.stopPropagation();
    console.log("#box wheel");
  });

  var ss_container = document.getElementById("ss-container");
  SimpleScrollbar.initEl(ss_container);
  document.getElementById("ss-bg").addEventListener('wheel',
  function (event){
    //event.stopPropagation();
    console.log("#ss-bg wheel");
  });
  document.getElementById("ss-frame").addEventListener('wheel',
  function (event){
    //event.stopPropagation();
    console.log("#ss-frame wheel");
  });
  document.getElementById("ss-container").addEventListener('mousewheel',
  function (event){
    event.stopPropagation();
    console.log("#ss-container wheel");
  });
  $( "#ss-content" ).scroll(function( event ) {
      //event.stopPropagation();  
      console.log("#ss-container scroll");
  });

} );