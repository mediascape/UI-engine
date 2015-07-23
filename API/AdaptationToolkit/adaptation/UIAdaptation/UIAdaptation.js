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
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/spinner",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/accordion",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/verticalMenu",
  "mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/scrollHorizontal"],
  function(componentsManager){
    var layoutList   = Array.prototype.slice.apply( arguments );
    var cmps=[];
    var UIAdaptation = function(){
      var layouts = [];
      var actualLayout;
      var layoutIndex=0;
      var activityTimer;
      var This = this;

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
            console.log('registring layout',layout);
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
          document.querySelector('button').setAttribute('style','display:none');
        }
      }
      this.useLayout = function (layoutName){
        // find the rule
        actualLayout = layouts.filter(function(el){
          if (el.name == layoutName) return true;
          else return false;
        })[0];
        if (!actualLayout) throw new Error ("There is no layout named: "+layoutName);
        else  this.layout(cmps,"onComponentsChange");
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
          else if (event === "onOrientationChange")
          actualLayout.onComponentsChange
          else if (event === "onResizeEvent")
          actualLayout.onResizeEvent(_cmps);

        }


      }

      this.onComponentsChange = function (_cmps,cmds){
          // Filter only showing ones
          actualLayout.unload(cmps);
          cmps = _cmps;
          console.log(cmps);
          if (This.layoutMode === This.LAYOUTMODE.ADAPTABLE){
            layoutIndex=0;
            actualLayout = This.findBestLayout(cmps)[layoutIndex];
            This.layout(cmps,'onComponentsChange');
            layoutIndex++;
          }
          else
            This.layout(cmps,'onComponentsChange');
            mediascape.AdaptationToolkit.uiComponents.infoPanel('Layout info','<p>Components Number: '+cmps.length+'</p><p> Rendering layout: '+actualLayout.name+'</p>','250px','1%','6%');
            This.updateComponentQuery();
      }
      this.onWindowResize = function (event){
        // Filter only showing ones
        //cmps = cmds.filter(function(el){});

        if (event.detail !="emulate")
        {
          console.log("RESIZING",event);
          this.layout(cmps,'onResizeEvent');
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
        mediascape.AdaptationToolkit.uiComponents.infoPanel('Layout info','<p>Components Number: '+cmps.length+'</p><p> Rendering layout: '+actualLayout.name+'</p>','250px','1%','6%');
        this.forceRedraw();
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
        console.log(thereIsVideo);

        var inch_size=Math.sqrt(Math.pow(mediascape.Agent.data.screensize[1].screenX,2)+Math.pow(mediascape.Agent.data.screensize[1].screenY,2));

          if(inch_size<=6){
            //alert('movil '+ inch_size+ ' ' +mediascape.Agent.data.screensize[0].height+' '+mediascape.Agent.data.screensize[0].width+ ' '+devicePixelRatio+' '+mediascape.Agent.data.screensize[1].screenX+' '+mediascape.Agent.data.screensize[1].screenY );
            if(mediascape.Agent.data.screensize[1].screenY>mediascape.Agent.data.screensize[1].screenX)
            {
              if(componentsNumber<=3){
                  if(thereIsVideo){
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));

                  }
                  else{
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));

                  }
              }
              else{
                  if(thereIsVideo){

                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
 
                  }
                  else
                  {

                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                 
                  }
              }
            }
            else{
              if(componentsNumber<=3){
                if(thereIsVideo){
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
         
                }
                else{
                  optimizedLayoutOrder.push(this.getLayout('grid'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                 optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
    

                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                 optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));

                }
                else{
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
       
                }
              }

            }
          }
          else if(6<inch_size && inch_size<=12){

           //alert('tablet '+ inch_size+ ' '+mediascape.Agent.data.screensize[1].screenX+' '+mediascape.Agent.data.screensize[1].screenY+ ' '+devicePixelRatio +' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);
            if(mediascape.Agent.data.screensize[1].screenY>mediascape.Agent.data.screensize[1].screenX)
            {

              if(componentsNumber<=3){
                  if(thereIsVideo){
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
        
                  }
                  else{
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu')); 
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                  }
              }
              else{
                  if(thereIsVideo){

                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu')); 
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));                 
                  }
                  else
                  {

                    optimizedLayoutOrder.push(this.getLayout('menu'));
                    optimizedLayoutOrder.push(this.getLayout('horizontal'));
                    optimizedLayoutOrder.push(this.getLayout('accordion'));
                    optimizedLayoutOrder.push(this.getLayout('pip'));
                    optimizedLayoutOrder.push(this.getLayout('customGrid'));
                    optimizedLayoutOrder.push(this.getLayout('spinner'));
                    optimizedLayoutOrder.push(this.getLayout('verticalMenu'));  
                    optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));             
                  }
              }
            }
            else{           
              if(componentsNumber<=3){
                if(thereIsVideo){
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));         
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                }
                else{
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                  
                }
              }
              else{
                if(thereIsVideo){
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                  
                }
                else{

                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
           
                }
              }            

           }       
        }

          else{

           //alert('tele '+inch_size+ ' '+ mediascape.Agent.data.screensize[1].screenX+' '+mediascape.Agent.data.screensize[1].screenY+' '+devicePixelRatio+' '+ mediascape.Agent.data.screensize[0].width+' '+mediascape.Agent.data.screensize[0].height);


              if(componentsNumber<=5){
                if(thereIsVideo)
                {
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                  
                }
                else{
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                 optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                 
                }
              }
              else{
                if(thereIsVideo){

                  optimizedLayoutOrder.push(this.getLayout('customGrid'));                  
                  optimizedLayoutOrder.push(this.getLayout('pip'));                  
                  optimizedLayoutOrder.push(this.getLayout('menu'));                 
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                   
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));

                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                  optimizedLayoutOrder.push(this.getLayout('spinner'));

                }
                else{
                  optimizedLayoutOrder.push(this.getLayout('accordion'));
                  optimizedLayoutOrder.push(this.getLayout('pip'));
                  optimizedLayoutOrder.push(this.getLayout('menu'));
                  optimizedLayoutOrder.push(this.getLayout('horizontal'));
                  optimizedLayoutOrder.push(this.getLayout('customGrid'));
                 optimizedLayoutOrder.push(this.getLayout('spinner'));
                  optimizedLayoutOrder.push(this.getLayout('verticalMenu'));
                  optimizedLayoutOrder.push(this.getLayout('scrollHorizontal'));
                  

                }
              }
            }

          
        



        
        return optimizedLayoutOrder;
      }
      this.changeLayout = function (){

      }
      this.listenForActivity = function (){

          window.addEventListener('resize',this.onWindowResize.bind(this),false);
          document.addEventListener('keydown',applicationIsActive.bind(this),false);
          window.addEventListener('click',applicationIsActive.bind(this),false);
          window.addEventListener('touch',applicationIsActive.bind(this),false);
          window.addEventListener('tap',applicationIsActive.bind(this),false);
          window.addEventListener('mousemove',applicationIsActive.bind(this),false);
          document.addEventListener('click',applicationIsActive.bind(this),false);
          function applicationIsActive (){
            if (actualLayout)
               if (actualLayout.onActivity){
                  clearTimeout(activityTimer);
                  activityTimer=actualLayout.onActivity(cmps);

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
      this.checkForExplicitRules = function (cmps,event){
        var resultRule = null;
        var inch_size=Math.sqrt(Math.pow(mediascape.Agent.data.screensize[1].screenX,2)+Math.pow(mediascape.Agent.data.screensize[1].screenY,2));
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
