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
      this.init = function (){
        var layoutProp=['order','rwidth','propx','propy','bestfit','required',"needs","duplicable","movable"];
        var file='resources/layout/components.layout';
        this.parseComponents(file,layoutProp).then(function(cmps){
          var event = new CustomEvent("adaptationToolkit-ready", {"detail":{"loaded":true,components:cmps}});
          setTimeout(function(){document.dispatchEvent(event);},2000);
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
                if (el.nodeName.split('-').length === 2){
                    var id = el.getAttribute('id');
                    el.setAttribute('touch-action','none');
                    el.setAttribute('drag-resize','');
                    el.shadowRoot.querySelectorAll('div,span').array().forEach(function(htmlelement){
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
        return components;
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
      this.getHiddenComponents = function(showedCmp){
        return components.filter(function(cmp){
               return showedCmp.every(function(cmp2){
                      if (cmp2.id !== cmp.id) return true;
                      else return false;
               });
        });
      }
      var iid = setInterval(this.checkComponentsReady.bind(this),500);
      // Wrapp components into main div #componentsContainer does not work on gecko
      function wrappComponents (cmps){
        var componentsContainer = document.createElement('div');
        componentsContainer.id = "componentsContainer";
        document.body.appendChild(componentsContainer);
        cmps.forEach(function(c){
          componentsContainer.appendChild(c);
        })

      }

      document.addEventListener('mediascape-ready',this.init.bind(this),false);
    };


    core.__moduleName = "core";
    return core;

  });
