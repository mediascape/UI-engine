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
**      CssParser is a helper for componentMananger, which helps reading CSS atributes:
**      custom attributes (not exists at the standard), webcomponents css etc.
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
  ["jquery"
  ],
  function($){

    var cssParser = function(){
      this.customProperties = [];
      var customCss = '';
      this.readComponentCSS = function (cmp) {
        var cssRules='';
        if (cmp.shadowRoot.styleSheets)
          cssRules=cmp.shadowRoot.styleSheets.item(0).cssRules;
          else {
            /**
            * Find stylesheet relation width component
            *
            */
            var localName= cmp.localName;
            var appStyles = document.styleSheets;
            var ownStyleSheet=null;

            for (var x in appStyles){
              if (appStyles[x].ownerNode)
                if (appStyles[x].ownerNode.textContent.indexOf(localName)>-1)
                  ownStyleSheet=appStyles[x];
                }
                /**
                * Find which of them have media condition
                *
                */

                cssRules=ownStyleSheet.cssRules;
              }
              var mediaList=[];

              for (var x in cssRules){

                if (cssRules[x].cssText)
                  if (cssRules[x].cssText.indexOf('@media')>-1){
                    mediaList.push(cssRules[x]);
                  }
                }

                return mediaList;
              };
              this.readCustomCss = function (file,properties) {
                this.css='';
                console.log("barruan");
                _this = this;
                 var promise =
                 mediascape.AdaptationToolkit.componentManager.core.getFile(file).then(
                  function(data) {
                  _this.css = data;


                if (properties)
                  _this.setCustomProperties(properties);
                var elements =[];
                var elem =[];
                elements=_this.css.trim().split('#');
                elements=elements.splice(1);

                for(var j=0;j<elements.length;j++)
                {
                  elem[elements[j].split('{')[0]]={layoutProperties:[]}
                  var aux=elements[j].split('{')[1].split('}')[0];
                  var aux1=aux.split(';');
                  var layoutProperties={};
                  aux1.forEach(function(el,i){
                   this.customProperties.forEach(function(prop){
                    if (el.trim().indexOf(prop)>=0){
                      var attrs=el.split(':');
                      if (prop.toLowerCase().indexOf("needs")>-1){

                        var needsAttr = attrs[1].split(",");
                        var tmpAttr = [];
                        needsAttr.forEach(function(attr){
                           var menor = attr.split('<');
                           var mayor = attr.split('>');
                           var igual = attr.split('=');
                           //Imposible case screenSize >=< 2 ??
                           if (attr.indexOf('none')>-1){
                             var obj = {};
                             obj.name = "attribute";
                             obj.key = mayor[0];
                           }
                           else {
                           if (menor.length === 1 && mayor.length === 1 && igual.length == 1) {
                             var obj = {};
                            obj.name = "attribute";
                            obj.key = mayor[0];
                           }
                           // attr > than Numnber
                           if (menor.length === 1 && mayor.length > 1 && igual.length == 1)
                           {
                              var obj = {};
                              obj.name = "compare";
                              obj.key = mayor[0];
                              obj.operation = "bigger";
                              obj.value = mayor[1];
                              obj.compare = function (x1,x2){
                                  if (x1>x2) return 1;
                                  else if (x1<x2) return -1
                                        else return 0;
                              }
                           }
                           else {
                             var obj = {};
                             obj.name = "attribute";
                             obj.key = mayor[0];

                           }
                          }
                           tmpAttr.push(obj);
                        });
                        layoutProperties[attrs[0].trim()]=tmpAttr;
                      }
                      else
                      if (prop.toLowerCase().indexOf("bestfit")>-1){
                        var bestFitAttr = attrs[1].split(",");
                        var obj = {};
                        obj.name="bestFit";
                        if (bestFitAttr.indexOf("biggestScreenSize")>-1){
                            obj['biggestScreenSize'] = true;
                        }
                        else obj['biggestScreenSize'] = false;
                        if (bestFitAttr.indexOf("smallestScreenSize")>-1){
                            obj['smallestScreenSize'] = true;
                        }
                        else obj['smallestScreenSize'] = false;
                        if (bestFitAttr.indexOf("touchable")>-1){
                            obj['touchable'] = true;
                        }
                        else obj['touchable'] = false;
                        obj.getBestFitPropertie = function (propertie){

                          for (var i = 0; i < arguments.length; i++) {
                              if (obj[arguments[i]])
                                if(obj[arguments[i]]) return true;
                                else return false;
                           }
                          return false;
                        }
                        layoutProperties[attrs[0].trim()]=obj;

                      } else
                          layoutProperties[attrs[0].trim()]=attrs[1];
                    }

                  },this);
                },_this);
                  var name =  elements[j].split('{')[0].trim();
                  var obj = {};
                  obj[name] = layoutProperties;
                  elem.push(obj);
                }
                customCss = elem;
                return customCss;
               });
               return promise;
              };
              this.readCss = function (selector,prop) {
                var localName= selector;
                var appStyles = document.styleSheets;
                var ownStyleSheet=null;

                for (var x in appStyles){
                  if (appStyles[x].ownerNode)
                    if (appStyles[x].ownerNode.textContent.indexOf(localName)>-1)
                      ownStyleSheet=appStyles[x];
                    }
                    /**
                    * Find which of them have media condition
                    *
                    */

                    cssRules=ownStyleSheet.cssRules;

                return cssRules;
              };
              this.setCustomProperties = function (properties){
                properties.forEach(function(prop,i,array){
                    if (this.customProperties.indexOf(prop)<0){
                       this.customProperties.push(prop);
                    }
                },this);
              };
              this.getCustomCss = function (){
                return customCss;
              };

            }
            cssParser.__moduleName = "cssParser";
            return cssParser;

          });
