/*
** Long Library Name:
**	Protocols Discovery Module
**
** Acronym and its version:
**	ProtocolsDiscovery v1.0
**
** Copyright claim:
**	Copyright ( C ) 2013-2014 Vicomtech-IK4 ( http://www.vicomtech.org/ ),
**	all rights reserved.
**
** Authors (in alphabetical order):
**	Angel Martin <amartin@vicomtech.org>,
**	Iñigo Tamayo <itamayo@vicomteh.org>,
**	Ion Alberdi <ialberdi@vicomtech.org>
**
** Description:
**	The Protocols Discovery Module finds the modules defined in the folder
**	"discovery/" and returns the objects and functions defined.
**
** Development Environment:
** 	The software has-been Implemented in JavaScript, and tested in Chrome
**	browsers and Android 4.3 device.
**
** Dependencies:
** 	As accounts package depends on other libraries, the user must adhere to and
**	keep in place any Licencing terms of those libraries:
**		requirejs v2.1.14 (http://requirejs.org/)
**
** Licenses dependencies:
**	License Agreement for requirejs:
**		BSD 3-Clause license (http://opensource.org/licenses/BSD-3-Clause)
**		MIT license (http://opensource.org/licenses/MIT)
**
*/

define(
  [
  ],
  function(){
    var Agent = {};
    var moduleList   = Array.prototype.slice.apply( arguments );
    var Agent = function Agent( AdaptationToolkit, _AdaptationToolkit, config ){
      var modules = [],
      loadedModules = 0,
      readyModules = 0;
      this.agentId = "xxxx";
      this.data = {};

      this.__moduleName = "Agent";
      this.onChange = function(file){

      };
      this.onAppInit = function (){
        console.log("BARRUAN<<<<<<<<<<<<<<<<<");
        var _this = this;
        this.customCmpAg="";
        var __this = _this;
          /*  _this.getTouchableFlag().then(function(rsc){
              __this.data['touchable'] = rsc;
            })
*/

          _this.getCapabilities().then(function(rsc){
          //  if(rsc.capabilities[getCapabilityIndex(rsc,'batteryPresence')].batteryPresence) __this.data['battery'] = rsc.capabilities[getCapabilityIndex(rsc,'batteryExtra')].batteryExtra;
          //  else __this.data['battery'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'screenSizePresence')].screenSizePresence) __this.data['screensize'] = rsc.capabilities[getCapabilityIndex(rsc,'screenSizeExtra')].screenSizeExtra;
            else __this.data['screensize'] = false;
        /*    if(rsc.capabilities[getCapabilityIndex(rsc,'cameraPresence')].cameraPresence) __this.data['camera'] = rsc.capabilities[getCapabilityIndex(rsc,'cameraExtra')].batteryExtra;
            else __this.data['camera'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'audioPresence')].audioPresence) __this.data['audio'] = rsc.capabilities[getCapabilityIndex(rsc,'audioExtra')].audioExtra;
            else __this.data['audio'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'connectionPresence')].connectionPresence) __this.data['connection'] = rsc.capabilities[getCapabilityIndex(rsc,'connectionExtra')].connectionExtra;
            else __this.data['connection'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'languagePresence')].languagePresence) __this.data['language'] = rsc.capabilities[getCapabilityIndex(rsc,'languageExtra')].languageExtra;
            else __this.data['language'] = false;
            //if(rsc.capabilities[getCapabilityIndex(rsc,'geolocationPresence')].geolocationPresence) __this.data['geolocation'] = rsc.capabilities[getCapabilityIndex(rsc,'geolocationExtra')].geolocationExtra;
            //     	else __this.data['geolocation'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'deviceProximityPresence')].deviceProximityPresence) __this.data['deviceProximity'] = rsc.capabilities[getCapabilityIndex(rsc,'deviceProximityExtra')].deviceProximityExtra;
            else __this.data['deviceProximity'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'userProximityPresence')].userProximityPresence) __this.data['userProximity'] = rsc.capabilities[getCapabilityIndex(rsc,'userProximityExtra')].userProximityExtra;
            else __this.data['userProximity'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'vibrationPresence')].vibrationPresence) __this.data['vibration'] = rsc.capabilities[getCapabilityIndex(rsc,'vibrationPresence')].vibrationPresence;
            else __this.data['vibrator'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'orientationPresence')].orientationPresence) __this.data['orientation'] = rsc.capabilities[getCapabilityIndex(rsc,'orientationExtra')].orientationExtra;
            else __this.data['orientation'] = false;
            if(rsc.capabilities[getCapabilityIndex(rsc,'bluetoothPresence')].bluetoothPresence) __this.data['bluetooth'] = rsc.capabilities[getCapabilityIndex(rsc,'bluetoothPresence')].bluetoothPresence;
            else __this.data['bluetooth'] = false;*/
            if(rsc.capabilities[getCapabilityIndex(rsc,'touchScreenPresence')].touchScreenPresence) __this.data['touchable'] = rsc.capabilities[getCapabilityIndex(rsc,'touchScreenPresence')].touchScreenPresence;
            else __this.data['touchable'] = false;
            var event = new CustomEvent('agent-ready',{detailed:true});
            document.dispatchEvent(event);
          });

		function getCapabilityIndex(data,value){
		for (var i = 0; i < data.capabilities.length; i++) {
			if(data.capabilities[i].hasOwnProperty(value)){
				return i;
			}

		}
	}


      }
      this.getCapabilities = function (){
          return mediascape.discovery.getExtra();
      }
      this.getScreenSize = function (){
          return mediascape.discovery.getExtra('screensize');
      }
      this.getTouchableFlag = function (){
          return mediascape.discovery.isPresent('touchscreen');
      }
      this.amIFirstOne = function (agents){
         var me = mediascape.Agent.agentId;
         if (me === agents[0].agentid) return true;
         else return false;
      }
      this.checkAgentLimitation = function (prop){
         var device = navigator.userAgent.toString().toLowerCase();
         device = device.indexOf('hbbtv')>-1?'hbbtv':device.indexOf('mobile')>-1?'mobile':'other';
         console.log("DEVICE:",device);
         if (prop === 'video'){
            if (device === 'mobile' || device === 'hbbtv'){
              return 1;
            }
            else {
              return undefined;
            }
         }
         return undefined;
      }
      this.getCapability = function (ag,propertie){
        var result = 0;
        //console.log(ag);

        //bigScreenCapability
        if (propertie === "screen"){
          var size = ag['screensize'][1];
          var diagonal = Math.round(
          Math.sqrt(
            Math.pow(
              parseFloat(size['screenX']),2)+Math.pow(parseFloat(size['screenY']),2)));
           return diagonal;
        }
        if (propertie === "touchable"){
            var val="";
            if (ag['touchable'].presence !=undefined) val = ag['touchable'].presence;
            else val = ag['touchable'];
            return val;
        }
        return false;

      }
      //window.addEventListener("deviceorientation", function(e){console.log(e);}, true);
     window.onbeforeunload = function(e) {
       //console.log( mediascape.Communication.localAgentDisconnected);
      // if (mediascape.Communication.getAgents().length===1){
        try {mediascape.Communication.localAgentDisconnected(mediascape.Agent.agentId);} catch (e){console.log(e);}
        return "Are you sure?"
     //}
   };
      document.addEventListener("mediascape-modules-ready",this.onAppInit.bind(this),true);
      return this;

    };

    Agent.__moduleName = "Agent";
    return Agent;

  });
