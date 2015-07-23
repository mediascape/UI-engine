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
  [	"mediascape/Sharedstate/sharedstate","mediascape/Mappingservice/mappingservice","../Communication/sharedmotion","jquery"
  ],
  function(){
    var communication = {};
    var moduleList   = Array.prototype.slice.apply( arguments );
    var communication = function Communication( AdaptationToolkit, _AdaptationToolkit, config ){
      var modules = [],
      loadedModules = 0,
      localAgents =  [],
      readyModules = 0;
      var sharedStates = {};
      this.GROUP_ID = 'prototype3Test';
      var map = null;
      for( var i=0; i<moduleList.length-1; ++i ){
        var name = moduleList[ i ].__moduleName;

        communication[ name ] =  moduleList[ i ];
        //modules.push( adaptation[ name ] );
      }
      this.__moduleName = "Communication";
      communication.getFile = function(file){
        return $.ajax({
          url: file,
          dataType: "text"
        });
      };
     communication.startApplicationContext = function (){

        /*setInterval(function(){
          var idx = Math.random()*(4-1)+1;
          var idx2 = Math.random()*(4-1)+1;
          var agents = ['me','agent1','agent2','agent3'];
          agents = agents.slice(idx,idx2);
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.onAgentsChange(agents);
        },5000);*/
        var applicationID ="Mediascape";
        map = mediascape.Communication.mappingService();
        // Already exists a group
        if (this.getUrlVar('group')) {
          this.GROUP_ID =this.getUrlVar('group');
        }
        // there is not group, created
        else {
          this.GROUP_ID = "mediascape"+this.createGroupId();
        }
        var _this = this;
        mediascape.discovery.connectNWS(applicationID).then(function(e){
        map.getGroupMapping(_this.GROUP_ID).then(function (data1) {
          var type ='app';
          console.log(data1);
          if (!sharedStates[type]) {
             sharedStates[type] = mediascape.Communication.sharedState(data1.group);
             sharedStates[type].on('readystatechange', function (data) {
                 if (data === 'open') {

                   init ();


                 }
             });
            function init (){
             sharedStates[type].on('presence', function (data) {
              mediascape.AdaptationToolkit.uiComponents.hideAssociationPanel();
              if (data.value ==="online" && sharedStates[type].agentid === data.key){
               console.log("presence",data);
               console.log(sharedStates[type].agentid);
               var agents  = sharedStates[type].getItem('agents') || [];
               if (sharedStates[type].agentid == data.key){
                 console.log(sharedStates[type].agentid);
                 mediascape.Agent.agentId = sharedStates[type].agentid;
                 agents.push({'agentid':sharedStates[type].agentid,'data': mediascape.Agent.data,'customCmdAg':''});
                 sharedStates[type].setItem('agents',agents);
                 localAgents = agents;
                 document.addEventListener('adaptationEngine-ready',function(){mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.localUpdate(agents);},false);
                }

               }
               if (data.value ==="disconnected"){
                     mediascape.Communication.localAgentDisconnected(data.key);
               }

              //  mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.onAgentsChange(agents);





             });
             sharedStates[type].on('change', function (data) {
               console.log(data);
               var state="inital";
               var agents  = sharedStates[type].getItem('agents') || [];
               if (data.key==="agents"){
                   if ( localAgents.length > agents.length ) state="disconnect";
                   else if ( localAgents.length < agents.length ) state="connect";
                   else state="dataChange";
                   localAgents = agents;
                   mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.onAgentsChange(agents,state);
                   console.log("APPLICATION CONTEXT READY");
                   var evt = new CustomEvent("applicationContext-ready", { "detail": "application context ready" });
                   document.dispatchEvent(evt);

              }
             });
             sharedStates[type].on('remove', function (data) {
                 //
             })
             // SharedState initializated
             //SEND URL BY NAMEDWEBSOCKET TO OTHER LAN CLIENTS
             if(e.readyState == 1){
                console.log(e);
								console.log("Start Interval");
             //if(e.peers.length==0 && e){
               console.log("Emit");
               e.emiter=true;
               interval = setInterval(function (){
                        var location = window.location.host+window.location.pathname;
                        e.send("http://"+location+"?group="+mediascape.Communication.GROUP_ID);
                        console.log("http://"+location+"?group="+mediascape.Communication.GROUP_ID);
                      }, 10000);
               }
               e.ondisconnect = function(event){
                              e.peersIds.splice(value.peersIds.indexOf(event.detail.target.id), 1);
                       if(e.readyState == 1){
                               if(value.peersIds[0]==value.id){
                                       interval1 = setInterval(function (){
                                               if(e.readyState == 1){
                                                       e.send(data.group);
                                                       console.log(data.group);
                                               }else clearInterval(interval1);
                                       }, 1000);
                               }
                       }
               };
               e.onmessage = function(event){
                       console.log(event);
                       if(event.data.indexOf("peersIds")!=-1) e.peersIds=JSON.parse(event.data).peersIds;
               }
             //}
          }

          }


       }); // NamedWebsocketConnection
        }).catch(function (erorr) {
            console.log(erorr)
        });



      }
      communication.setAgents = function (agents){
        var type ='app';
        sharedStates[type].setItem('agents',agents);
      }
      communication.getAgents = function (){
        var type ='app';
        return  sharedStates[type].getItem('agents');
      }
      communication.getAgentNumber = function (){
        console.log("hemen",map);
      }
      communication.localAgentDisconnected = function (agentid){
        this.getAgentNumber()
        var type = "app";
        var agents  = sharedStates[type].getItem('agents') || [];
      /*  if (agents.length === 1){
            agents = [];
        }
        else {*/
        agents = agents.filter(function(ag){
            if (ag.agentid === agentid) return false;
            else return true;
        });
       //}
       sharedStates[type].setItem('agents',agents);
      }
      communication.clearAgents = function (){
        var type = "app";
        var agents  =  [];

       sharedStates[type].setItem('agents',agents);
      }
      communication.getUrlVar = function (name){
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
        });
        return vars[name];
      }
      communication.createGroupId = function ()
      {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
      communication.getGroupId = function(){
        return this.GROUP_ID;
      }
      communication.setLocalComponentsOfAgent = function (cmps){
        try {
          var agentId = mediascape.Agent.agentId;
          var agents = sharedStates['app'].getItem('agentsCmp'+agentId) || [];
          console.log('agentsCmp'+agentId,cmps);
          var cmpsName = cmps.map(function(el){return el.getAttribute('compId');});
          sharedStates['app'].setItem('agentsCmp'+agentId,cmpsName);
        }
        catch (e){
          console.log(e);
        }


    };
    communication.setComponentOfAgent = function (agentId,cmp,command){

        var agents = sharedStates['app'].getItem('agentsCmp'+agentId) || [];
        if (agents.length>0){
            var agentToUpdate = agents.filter(function(ag){
                if (ag.agentid === agentId) return true;
                else false;
            })[0];
            var cmps = agentToUpdate.components;
            var exists = false;
            cmps = cmps.filter(function(c){
                if (c.getAttribute('compId') === cmp.getAttribute('compId')){
                  if (command === "show"){
                      return true;
                  }
                  else if (command==="hide"){
                      return false;
                  }
                  exists = true;
                }
            });
           if (!exists){
              cmps.push(cmp.getAttribute('compId'));
           }
        }
        console.log('agentsCmp'+agentId,cmps);
        sharedStates['app'].setItem('agentsCmp'+agentId,cmps);
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setComponentToAgent(agentId,cmp);


  };


    communication.getAgentsComponents = function (cmps){
        var agentId = mediascape.Agent.agentId;
        var agents = sharedStates['app'].getItem('agents') || [];
        var agentsCmps = agents.map(function(el){

                var obj = {};
                obj.components = sharedStates['app'].getItem('agentsCmp'+el.agentid) || [];
                obj.agentId = el.agentid;
                return obj;


        });
        return agentsCmps;
    }
      return communication;
    };

    communication.__moduleName = "Communication";
    return communication;

  });
