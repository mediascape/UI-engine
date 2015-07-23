
(function init() {
  if ( typeof define === "undefined" ) {
    var rscript = document.createElement( "script" );
    rscript.onload = function() {
      init();
    };
    rscript.src = "../resources/require.js";
    document.head.appendChild( rscript );
    return;
  }

  require.config({
    baseUrl: '/js',
    paths: {

      underscore:'../resources/libs/underscore-min',
      jquery: '../resources/libs/jquery-2.1.1.min',
      qrcode:'../resources/libs/qrcode.min',
      ui:'../resources/libs/jquery-ui',
      namedwebsockets:'mediascape/lib/namedwebsockets'
    },
    waitSeconds:0
  });

define( "mediascape", [ "mediascape/AdaptationToolkit/AdaptationToolkit","mediascape/Discovery/discovery","../resources/agent/agent" ],     	function($, Modules){
      var mediascape = {};
      var discovery= {};
			var moduleList   = Array.prototype.slice.apply( arguments );
      mediascape.init = function(options) {
        mediascapeOptions = {};
        _this = Object.create( mediascape );

			for( var i=0; i<moduleList.length; ++i ){
				var name = moduleList[ i ].__moduleName;
				mediascape[ name ] = new moduleList[ i ]( mediascape, "gq"+i, mediascape );
				
			}
      var event = new CustomEvent("mediascape-modules-ready", {"detail":{"loaded":true}});
      document.dispatchEvent(event);
      return _this;
      };

      mediascape.version = "0.0.1";
      // See if we have any waiting init calls that happened before we loaded require.
      if( window.ms ) {
        var args = window.mediascape.__waiting;
        delete window.mediascape;
        if( args ) {
          mediascape.init.apply( this, args );
        }
      }
      window.mediascape = mediascape;

      //return of ms object with discovery and features objects and its functions
      return mediascape;
    });

  require([ "mediascape" ], function (mediascape) {
    console.log("mediascape require");
    mediascape.init();
    var systemReady = waitFor.every(function(event){
      if (event.ready) return true;
      else return false;
    });
       setTimeout(function(){
        var event = new CustomEvent("mediascape-modules-ready", {"detail":{"loaded":true}});
        document.dispatchEvent(event);
      },4000);
    if (systemReady){
      var event = new CustomEvent("mediascape-ready", {"detail":{"loaded":true}});
      document.dispatchEvent(event);
    }
    else {
      var timeout = false;
      var time1 = new Date().getTime();
      var waitForTmp = waitFor;
      var intervalId = setInterval(
        function (){
          systemReady = waitForTmp.every(function(event){
            if (event.ready) return true;
            else return false;
          });
          var time2 = new Date().getTime();
          if (time2-time1>10000) timeout=true;
          if (timeout){
              clearInterval(intervalId);
              throw Error("Timeout getting ready system, events related:"+waitForTmp.map(function(d){return d.name+".ready="+d.ready;}));
           }
          else if (systemReady){
              clearInterval(intervalId);
              var event = new CustomEvent("mediascape-ready", {"detail":{"loaded":true}});
              document.dispatchEvent(event);
        }

      },500);

   }

  });
}());

var waitFor = [{name:'WebComponentsReady',ready:false},{name:'agent-ready',ready:false}];
waitFor.forEach (function(event){
  document.addEventListener(event.name, function(e) {
    event.ready = true;
  });
},this);
