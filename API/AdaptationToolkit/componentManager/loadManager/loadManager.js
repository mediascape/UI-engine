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
**      Load manager offers functionality for load/unload resources of webcomponents and each
**      resources.
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
  [
  ],
  function(){

    var loadManager = function(){
      var actualComponents = [];
      this.load = function (els) {
          var allcmps = mediascape.AdaptationToolkit.componentManager.core.getComponents();
          allcmps.forEach(function(el){
            el.shadowRoot.host.style.display="none";

            //el.shadowRoot.host.style.width="400px";
            //el.shadowRoot.host.style.height="400px";
          });
          els.forEach(function(el){
            var allreadyLoaded = actualComponents.some(function(cmp){
               if(cmp.id === el.id) return true;
               else return false;
            })
            if (!allreadyLoaded){
            var v = el.shadowRoot.querySelector('video');
            if (v){
               v.src = el.getAttribute('file');
               if (el.play) {
                // el.pause();
                 el.play();
                 v.play();
               }
             }
            }
             el.shadowRoot.host.style.display="block";
            //el.shadowRoot.host.style.width="400px";
            //el.shadowRoot.host.style.height="400px";
          });
          actualComponents = els;
      };
      // Just hidden all at least
      this.unload = function (els) {
        els.forEach(function(el){

          el.shadowRoot.host.style.display="none";

            var v = el.shadowRoot.querySelector('video');
            if (v) v.src="";

        //  el.shadowRoot.host.style.width="400px";
        //  el.shadowRoot.host.style.height="400px";
        actualComponents = actualComponents.filter(function(cmp){
            if (cmp.id === el.id) return false;
            else return true;
        });
        });

      };

    };
    loadManager.__moduleName = "loadManager";
    return loadManager;

  });
  Function.prototype.getBody =
  function() {
    // Get content between first { and last }
    var m = this.toString().match(/\{([\s\S]*)\}/m)[1];
    // Strip comments
    return m.replace(/^\s*\/\/.*$/mg,'');
  };
