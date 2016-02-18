/*
** Long Library Name:
**      Adaptation toolkit Module
**
** Acronym and its version:
**      Adaptation toolkit v1.0
**
** Copyright claim:
**      Copyright ( C ) 2013-2014 Vicomtech-IK4 ( http://www.vicomtech.org/ ),
**      all rights reserved.
**
** Authors (in alphabetical order):
**      Ana Dominguez <adominguez@vicomtech.org>
**      Iñigo Tamayo <itamayo@vicomteh.org>,
**      Mikel Zorrila <mzorrilla@vicomtech.org>,
**
** Description:
**      User interface Adapation Engine is resposible of adapting given N components to the correct
**      layout, taking in a account the context.
**
** Development Environment:
**      The software has-been Implemented in JavaScript, and tested in Chrome and firefox
**      browsers.
**
** Dependencies:
**      As accounts package depends on other libraries, the user must adhere to and
**      keep in place any Licencing terms of those libraries:
**              requirejs v2.1.14 (http://requirejs.org/)
**
** Licenses dependencies:
**      License Agreement for requirejs:
**              BSD 3-Clause license (http://opensource.org/licenses/BSD-3-Clause)
**              MIT license (http://opensource.org/licenses/MIT)
**
*/

define(
  ["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/pip",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/menu",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/horizontal",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/customGrid",
  /*"mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/explicit",*/
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/accordion",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/verticalMenu",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/scrollHorizontal",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/spinner"],
  function(componentsManager){
    var layoutList   = Array.prototype.slice.apply( arguments );
    var cmps=[];
    //var prev_orientation='';
    var UIAdaptation = function(){
      var layouts = [];
      var actualLayout;
      var layoutIndex=0;
      var prev_orientation=90;
      var activityTimer;
      var This = this;
      var __screen;
      /*
       * STATIC: Layout established by user
       * CUSTOM: Without support of layout system, css support
       * ADAPTABLE: Layout are adaptable to the context
       */
      this.LAYOUTMODE = {CUSTOM:"custom",STATIC:"static",ADAPTABLE:"adaptable"};
      this.layoutMode ="static";
      this.explicitConf = [];

      this.registerLayouts = function () {
        var _this = this;
        $.getJSON('/resources/explicitsCss/rules.json', function(data) {
          _this.explicitConf = data;

        });
        layoutList.forEach(function(layout,i){
          if  (layout.checkForImplementation() || layout.name != "explicit"){
            //console.log('registring layout',layout);
            if (layout.name === "explicit") _this.explicitLayout = layout;
            layouts.push(layout);
          }
          else throw new Error ("Some error registring layout: "+layout.name);
        })


      };
      this.init = function (wcmps,mode){
        var _this = this;

        this.layoutMode = mode;
        cmps = wcmps;

        if (this.layoutMode == this.LAYOUTMODE.ADAPTABLE){
          actualLayout = this.findBestLayout(cmps)[layoutIndex];
          this.layout(cmps,'onLayoutChange');
          layoutIndex++;

        }
        else
        if (this.layoutMode == this.LAYOUTMODE.STATIC){
        //  this.layout(cmps,'onComponentsChange');
        }
      }
      this.useLayout = function (layoutName){
        // find the rule
        if (actualLayout) actualLayout.unload(cmps);
        actualLayout = layouts.filter(function(el){
          if (el.name == layoutName) return true;
          else return false;
        })[0];
        if (!actualLayout) throw new Error ("There is no layout named: "+layoutName);
        else  {
              if (this.layoutMode === this.LAYOUTMODE.STATIC) this.layout(cmps,"onComponentsChange");
              else  this.layout(cmps,"onLayoutChange");
              }
      }

      this.layout = function (_cmps,event){
        // CHECK FOR EXPLICIT RULE FIRST ELSE SWITCH
        var explicitRule = this.checkForExplicitRules(_cmps,event);
        if (explicitRule){
          if (event === "onComponentsChange"){
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            this.explicitLayout.onComponentsChange(_cmps,explicitRule);

          }
          else if (event === "onOrientationChange"){
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            this.explicitLayout.onOrientationChange(_cmps,explicitRule);

          }
          else if (event === "onResizeEvent"){

            this.explicitLayout.onResizeEvent(_cmps,explicitRule);

          }
          else   if (event === "onLayoutChange")
          {
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            this.explicitLayout.onLayoutChangeEvent(_cmps,explicitRule);
          }
          else {
            throw new Error ("Event does not exists");
          }
        }
        else
        switch (this.layoutMode){
          case this.LAYOUTMODE.CUSTOM:
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
          break;
          case this.LAYOUTMODE.STATIC:
          if (!actualLayout) throw new Error ("For using STATIC method first you have to choose one layout");
          if (event === "onComponentsChange"){
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            actualLayout.onComponentsChange(_cmps);
            //  actualLayout.render(_cmps);
          }
          else if (event === "onOrientationChange"){
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            actualLayout.onOrientationChange(_cmps);
            //  actualLayout.render(_cmps);
          }
          else if (event === "onResizeEvent"){
            //mediascape.AdaptationToolkit.componentManager.loadManager.load(cmps);
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            actualLayout.onResizeEvent(_cmps);
            //  actualLayout.render(_cmps);
          }
          else {
            throw new Error ("Event does not exists");
          }
          break;
          case this.LAYOUTMODE.ADAPTABLE:
          if (event === "onLayoutChange")
          {
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            actualLayout.onLayoutChangeEvent(_cmps);
          }
          else if (event === "onComponentsChange"){
            mediascape.AdaptationToolkit.componentManager.loadManager.unload( mediascape.AdaptationToolkit.componentManager.core.getHiddenComponents(_cmps));
            mediascape.AdaptationToolkit.componentManager.loadManager.load(_cmps);
            actualLayout.onComponentsChange(_cmps);
          }
          else if (event === "onOrientationChange"){

            actualLayout.onComponentsChange
          }
          else if (event === "onResizeEvent")
          actualLayout.onResizeEvent(_cmps);

        }

      }

      this.onComponentsChange = function (_cmps,cmds){
          // Filter only showing ones
          actualLayout.unload(cmps);
          cmps = _cmps;
          if (This.layoutMode === This.LAYOUTMODE.ADAPTABLE){
            layoutIndex=0;
            actualLayout = This.findBestLayout(cmps)[layoutIndex];
            This.layout(cmps,'onComponentsChange');
            layoutIndex++;
          }
          else
            This.layout(cmps,'onComponentsChange');
            //mediascape.AdaptationToolkit.uiComponents.infoPanel('Layout info','<p>Components Number: '+cmps.length+'</p><p> Rendering layout: '+actualLayout.name+'</p>','250px','1%','6%');
            This.updateComponentQuery();
      }
      this.onWindowResize = function (event){
        // Filter only showing ones
        //cmps = cmds.filter(function(el){});

       if(prev_orientation!==undefined && prev_orientation!==''){

            if(prev_orientation !== event.srcElement.orientation  ){

                prev_orientation=event.srcElement.orientation;
                clearTimeout(activityTimer);
                console.log (layoutIndex,cmps.length);
                actualLayout.unload(cmps);

                if (This.layoutMode === This.LAYOUTMODE.ADAPTABLE) 
                    actualLayout = This.findBestLayout(cmps)[0];
                this.layout(cmps,'onLayoutChange');

                this.forceRedraw();

            }
            else{

              if (event.detail !="emulate")
              {
                console.log("RESIZING",event);
                this.layout(cmps,'onResizeEvent');
              }
            }
          }


      else{
         prev_orientation=event.srcElement.orientation;

      
          if (event.detail !="emulate")
          {
            console.log("RESIZING",event);
            this.layout(cmps,'onResizeEvent');
          }
        }



      }
      this.onLayoutChangeEvent= function (){
        //DECIDE WHICH LAYOUT USE; IT IS CALLED WHEN USER EVENT HAPPENS

        clearTimeout(activityTimer);
        console.log (layoutIndex,cmps.length);
        actualLayout.unload(cmps);
        actualLayout = this.findBestLayout(cmps)[layoutIndex];
        this.layoutMode = this.LAYOUTMODE.ADAPTABLE;
        this.layout(cmps,'onLayoutChange');
        if (layouts.length-1 === layoutIndex) layoutIndex = 0;
        else layoutIndex++;
      //  mediascape.AdaptationToolkit.uiComponents.infoPanel('Layout info','<p>Components Number: '+cmps.length+'</p><p> Rendering layout: '+actualLayout.name+'</p>','250px','1%','6%');
      //  this.forceRedraw();
      }
      this.getLayouts = function (){
        return layouts;
      }
      this.getLayout = function (name){
        return layouts.filter(function(lay){
          if (lay.name === name) return true;
          else return false;
        })[0] || [];
      }
      this.findBestLayout = function (_cmps){
        //orientation change is seen as a resize in order to not repeat the execution of this function

        var componentsNumber = _cmps.length || 0;
        var optimizedLayoutOrder = [];

        var thereIsVideo=false;
        var i=0;
        while(i<_cmps.length){
          if(_cmps[i].shadowRoot.querySelector('video'))
          {
            thereIsVideo=true;
            break;
          }
          i++;
        }

        var screenX = getScreenSize().extra[1].screenX;
        var screenY = getScreenSize().extra[1].screenY;
        var _this = this;
        var result = [];
        var inch_size=Math.sqrt(Math.pow(screenX,2)+Math.pow(screenY,2));

          if(inch_size<=6){
            if(screenY>screenX)
            {
              if(componentsNumber<=3){
                  if(thereIsVideo){
                    optimizedLayoutOrder.push(_this.getLayout('accordion'));
                    optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(_this.getLayout('menu'));
                    optimizedLayoutOrder.push(_this.getLayout('pip'));
                    optimizedLayoutOrder.push(_this.getLayout('spinner'));
                    optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                  }
                  else{
                    optimizedLayoutOrder.push(_this.getLayout('accordion'));
                    optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(_this.getLayout('pip'));
                    optimizedLayoutOrder.push(_this.getLayout('menu'));
                     optimizedLayoutOrder.push(_this.getLayout('spinner'));
                    optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                  }
              }
              else{
                  if(thereIsVideo){
                    optimizedLayoutOrder.push(_this.getLayout('menu'));
                    optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(_this.getLayout('accordion'));
                    optimizedLayoutOrder.push(_this.getLayout('pip'));
                     optimizedLayoutOrder.push(_this.getLayout('spinner'));
                    optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                  }
                  else
                  {
                    optimizedLayoutOrder.push(_this.getLayout('menu'));
                    optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(_this.getLayout('accordion'));
                    optimizedLayoutOrder.push(_this.getLayout('pip'));
                     optimizedLayoutOrder.push(_this.getLayout('spinner'));
                    optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                  }
              }
            }
            else{
              if(componentsNumber<=3){
                if(thereIsVideo){
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('grid'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
              }

            }
          }
          //Tablet
          else if(navigator.userAgent.toLowerCase().indexOf("android")!=-1 && navigator.appVersion.indexOf('MK12')==-1){

           //alert('tablet '+ inch_size+ ' '+screenX+' '+screenY+ ' '+devicePixelRatio +' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);
                  if(screenY>screenX)
                  {
                    if(componentsNumber<=3){
                        if(thereIsVideo){
                          optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                          optimizedLayoutOrder.push(_this.getLayout('menu'));
                          optimizedLayoutOrder.push(_this.getLayout('pip'));
                          optimizedLayoutOrder.push(_this.getLayout('accordion'));
                          optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                          optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                        }
                        else{
                          optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                          optimizedLayoutOrder.push(_this.getLayout('pip'));
                          optimizedLayoutOrder.push(_this.getLayout('menu'));
                          optimizedLayoutOrder.push(_this.getLayout('accordion'));
                           optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                          optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                        }
                    }
                    else{
                        if(thereIsVideo){

                          optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                          optimizedLayoutOrder.push(_this.getLayout('accordion'));
                          optimizedLayoutOrder.push(_this.getLayout('pip'));
                          optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                           optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                          optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                        }
                        else
                        {

                          optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                          optimizedLayoutOrder.push(_this.getLayout('accordion'));
                          optimizedLayoutOrder.push(_this.getLayout('pip'));
                          optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                           optimizedLayoutOrder.push(_this.getLayout('spinner'));
                          optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                          optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                        }
                    }
                  }
                  else{
                    if(componentsNumber<=3){
                      if(thereIsVideo){
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('menu'));
                        optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                        optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                        optimizedLayoutOrder.push(_this.getLayout('spinner'));
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                        optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                      }
                      else{
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('menu'));
                        optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                        optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                         optimizedLayoutOrder.push(_this.getLayout('spinner'));
                        optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                        optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                      }
                    }
                    else{
                      if(thereIsVideo){
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('pip'));
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                        optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                         optimizedLayoutOrder.push(_this.getLayout('spinner'));
                        optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                        optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                      }
                      else{

                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('pip'));
                        optimizedLayoutOrder.push(_this.getLayout('accordion'));
                        optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                        optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                         optimizedLayoutOrder.push(_this.getLayout('spinner'));
                        optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                        optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                      }
                    }

                 }
              }

          //Computer (Mikelena)
          else if((navigator.userAgent.toLowerCase().indexOf("windows nt 6.3")!=-1)){

           //alert('tele '+inch_size+ ' '+ screenX+' '+screenY+' '+devicePixelRatio+' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);


              if(componentsNumber<=3){
                if(thereIsVideo)
                {
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));


                }
              }
            }

            //Computer as TV
            else if((navigator.userAgent.toLowerCase().indexOf("windows nt 6.1")!=-1)){

           //alert('tele '+inch_size+ ' '+ screenX+' '+screenY+' '+devicePixelRatio+' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);


              if(componentsNumber<=6){
                if(thereIsVideo)
                {
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));


                }
              }
            }

            else if(navigator.userAgent.toLowerCase().indexOf("android")!=-1 && navigator.appVersion.indexOf('MK12')!=-1){

           //alert('tele '+inch_size+ ' '+ screenX+' '+screenY+' '+devicePixelRatio+' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);


              if(componentsNumber<=3){
                if(thereIsVideo)
                {
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));


                }
              }

          }
          //nire ordenagailua
          else if(navigator.userAgent.toLowerCase().indexOf("x11")!=-1){

           //alert('tele '+inch_size+ ' '+ screenX+' '+screenY+' '+devicePixelRatio+' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);


              if(componentsNumber<=3){
                if(thereIsVideo)
                {
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));

                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));
                }
                else{
                  optimizedLayoutOrder.push(_this.getLayout('accordion'));
                  optimizedLayoutOrder.push(_this.getLayout('pip'));
                  optimizedLayoutOrder.push(_this.getLayout('menu'));
                  optimizedLayoutOrder.push(_this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(_this.getLayout('customGrid'));
                   optimizedLayoutOrder.push(_this.getLayout('spinner'));
                  optimizedLayoutOrder.push(_this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(_this.getLayout('scrollHorizontal'));


                }
              }

          }

              return optimizedLayoutOrder;


      }
      _this.changeLayout = function (){

      }
      this.listenForActivity = function (){

          window.addEventListener('resize',this.onWindowResize.bind(this),false);
          document.addEventListener('keydown',applicationIsActive.bind(this),false);
          window.addEventListener('click',applicationIsActive.bind(this),false);
          window.addEventListener('touch',applicationIsActive.bind(this),false);
          window.addEventListener('tap',applicationIsActive.bind(this),false);
          window.addEventListener('mousemove',applicationIsActive.bind(this),false);
          document.addEventListener('click',applicationIsActive.bind(this),false);
          function applicationIsActive (e){
            if (actualLayout)
               if (actualLayout.onActivity){
                  clearTimeout(activityTimer);
                  activityTimer=actualLayout.onActivity(cmps,e);

            }
          }
        }


      this.updateComponentQuery = function (cmp){
        var cmps = mediascape.AdaptationToolkit.componentManager.core.getComponents();
        var event = new CustomEvent('resize', { 'detail': 'emulate' });
        window.dispatchEvent(event);
        for (var x = 0 ; x< cmps.length;x++)
             cmps[x].updateNodes();
        this.forceRedraw();

      }
      // Trick for some render problem with webkit css grid layout render
      this.forceRedraw = function (){
        var disp = document.body.style.display;
        document.body.style.display = 'none';
        var trick = document.body.offsetHeight;
        document.body.style.display = disp;
      }
      var getScreenSize  = function (){
          var widthPx;
          var heightPx;
          if (parseInt(navigator.appVersion)>3) {
             widthPx = screen.width;
             heightPx = screen.height;
          }
          else if (navigator.appName == "Netscape"
            && parseInt(navigator.appVersion)==3
            && navigator.javaEnabled()
            ) {
              var jToolkit = java.awt.Toolkit.getDefaultToolkit();
              var jScreenSize = jToolkit.getScreenSize();
              widthPx = jScreenSize.width;
              heightPx = jScreenSize.height;
            }

          document.body.insertAdjacentHTML( 'beforeend', '<div id="dpi" style="height: 1in; width: 1in; left: 100%; position: absolute; top: 100%;"></div>' );
          var dpi_x = document.getElementById('dpi').offsetWidth;
          var dpi_y = document.getElementById('dpi').offsetHeight;
          var width = (screen.width/window.devicePixelRatio) / dpi_x;
          var height = (screen.height/window.devicePixelRatio) / dpi_y;
          document.getElementById('dpi').remove();
          return JSON.parse('{"extra":[{"width":"'+widthPx+'","height":"'+heightPx+'"},{"screenX":"'+width+'","screenY":"'+height+'"}]}');

      }
      this.checkForExplicitRules = function (cmps,event){
        var resultRule = null;
        var inch_size=Math.sqrt(Math.pow(screenX,2)+Math.pow(screenY,2));
        if (this.explicitConf.rules)
        this.explicitConf.rules.forEach(function(rule){
          if (rule.condition.componentsNumber === cmps.length) resultRule = rule;
          if (rule.condition.componentsNumber === cmps.length && inch_size>rule.condition.screenSize ) resultRule = rule;

        },this);
        return resultRule;
      }

      this.registerLayouts();
      this.listenForActivity();
    }
    UIAdaptation.__moduleName = "UIAdaptation";
    return UIAdaptation;

  });
