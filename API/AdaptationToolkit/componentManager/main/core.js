https://raw.githubusercontent.com/mediascape/elections/master/www/js/mediascape/AdaptationToolkit/componentManager/main/core.jshttps://raw.githubusercontent.com/mediascape/elections/master/www/js/mediascape/AdaptationToolkit/componentManager/main/core.js/*
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
**      It is the core of componentManager, where all functionality converge to give a final
**	logic.
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
  ['underscore'
  ],
  function(_){

    var core = function(){

      var components = [];
      var componentStatus = undefined;
      this.init = function (){
        console.log("BARRUAN");
        var layoutProp=['order','rwidth','propx','propy','bestfit','required',"needs","duplicable","movable","icon"];
        var file='/resources/layout/components.layout';
        var _this = this;
        this.parseComponents(file,layoutProp).then(function(cmps){
          console.log("PARSING",cmps);
          var event = new CustomEvent("adaptationToolkit-ready", {"detail":{"loaded":true,components:cmps}});

          setTimeout(function(){document.dispatchEvent(event);},2000);
          _this.components = cmps;
        });
      }
      this.setComponentValue = function (cmp,property,value) {
          var cmpId = cmp.getAttribute('compid');
          if (cmpId) throw new Error(cmp + " does not exists");
          cmp.setAttribute(property,value);
      };
      this.parseComponents = function (file,layoutProp) {
        var cmps = document.body.children;
        var CssParser = mediascape.AdaptationToolkit.componentManager.cssParser;

        if (cmps.length ===0) throw new Error("there is no webcomponent to parse");
        // Filter only webcomponents
        cmps = _.toArray(cmps);
        var promise = CssParser.readCustomCss(file,layoutProp).then(function(data){

            components = cmps.filter(function(el,i){
            // custom elements determines that name has to be composite tag separeted by "-". ex : my-component
                if (el.nodeName.split('-').length >= 2 ){
                    var id = el.getAttribute('id');
                    el.setAttribute('touch-action','none');
                    el.setAttribute('drag-resize','');
                    [].slice.call(el.querySelectorAll('div,span')).forEach(function(htmlelement){
                        htmlelement.setAttribute('touch-action','none');
                        htmlelement.style.webkitUserSelect="none";
                    });
                    el.setAttribute('compId','compId'+i);
                    data.forEach(function(properties){
                        if (Object.keys(properties).indexOf(id)>-1) {
                          el['lproperties'] = properties[id] ;
                          if (el['lproperties'].movable === "true")
                             mediascape.AdaptationToolkit.uiComponents.addMovablePanel(el);

                        }

                    });

                // Inject component-query to each webcomponent
                //  el.setAttribute('extends','component-query');
                  return true;
                }
                else {
                  return false;
                }
             });
             // gecko does not support
             wrappComponents(components);
           return components;
        });
        return promise;
      };
      this.getComponents = function (){
        /*for (c in components){
           components[c] = document.querySelector('#'+components[c].id);
        }*/
        return components;
      }
      this.getComponentsStatus = function (){
        return componentStatus || [];
      }
      this.setComponentsStatus = function (status){
        componentStatus = status;
      }
      this.checkComponentsReady = function(){
          var ready = components.every(function(cmp){
                console.log(cmp.done);
                return cmp.done;
          });
          if (ready){
            var event = new CustomEvent('components-ready', { 'detail': 'emulate' });
            window.dispatchEvent(event);
            clearInterval(iid);
          }

      }
      this.getFile = function(file){
        return $.ajax({
          url: file,
          dataType: "text"
        });
      };
	  this.getComoponentsToShow = function (){
    if (componentStatus)
		 return componentStatus.filter (function(c){
				if (c.show) return true;}).map(
				function(c2){
					return document.querySelector("div [compId='"+c2.compId+"']");
        });
     else return [];

	  }
      this.getHiddenComponents = function(showedCmp){
        return components.filter(function(cmp){
               return showedCmp.every(function(cmp2){
                      if (cmp2.id !== cmp.id) return true;
                      else return false;
               });
        });
      }
      this.isLoaded = function(cmp){
          if (componentStatus)
          for (c in componentStatus){
             if (componentStatus[c].selector === cmp.id)
               if (componentStatus[c].show) return true;
               else return false;
          }
         return false;
      }
      this.setMenu = function (show){
         if (show){
            mediascape.AdaptationToolkit.uiComponents.showComponentMenu(components);
         }
         else {
             mediascape.AdaptationToolkit.uiComponents.hideComponentMenu(components);
         }

      }

      var iid = setInterval(this.checkComponentsReady.bind(this),500);
      // Wrapp components into main div #componentsContainer does not work on gecko
      function wrappComponents (cmps){
        var componentsContainer = document.createElement('div');
        componentsContainer.id = "componentsContainer";
        document.body.appendChild(componentsContainer);
        cmps.forEach(function(c){
	        var node = document.querySelector('#'+c.id);
          c = node;
          componentsContainer.appendChild(node);
        });

      }

      document.addEventListener('mediascape-modules-ready',this.init.bind(this),false);
    };


    core.__moduleName = "core";
    return core;

  });
