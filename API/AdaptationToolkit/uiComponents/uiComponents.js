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
**      All UI Components helpers are defined in this file. Notification components, compònents Menu
**      etc.
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

    uiComponents = function uiComponents(atk,i,atk){

        this.componentsMenu = function (){
      //Console.log();
        }
        this.actionMenu = function (){
      //Console.log();
        }
        this.loadingPanel = function (centralImg,time,cb){
           var div = document.createElement('div');
           div.id = "loadingPanel";
           div.style.position ="absolute";
           div.style.top="0px";
           div.style.left="0px";
           div.style.width="100%";
           div.style.height="100%";
           div.style.zIndex="10001";
           div.style.background="black";
        /*   div.style.animationName="opa";
           div.style.animationDuration=time+"s";
           div.style.animationIterationCount=time;
           div.style.animationDirection="alternate";
           div.style.animationTimingFunction="ease-out";
           div.style.animationFillMode="forwards";
           div.style.animationDelay="0s";*/
           var img = document.createElement('img');
           img.id="loaderimg";
           img.src=centralImg;
           img.style.position="absolute";
           img.style.top="30%";
           img.style.left="10%";
           img.style.animationName="bounce";
           img.style.animationDuration="2.5s";
           img.style.animationIterationCount="infinite";
          // img.style.animationDirection="alternate";
           img.style.animationTimingFunction="lineal";
        //   img.style.animationFillMode="forwards";
           img.style.animationDelay="0s";
           div.appendChild(img);
           document.body.appendChild(div);
           setTimeout(function(){  document.body.removeChild(div);},time*1000);
       }
        this.customPanel = function(callback1,callback2,callback3){

          var customizePanel=document.createElement('div');
          customizePanel.style.width='220px';
          customizePanel.style.display='-webkit-flex';
          customizePanel.style.display='flex';
          customizePanel.style.flexDirection='row';
          customizePanel.id='customizePanel';

           var onoff=function(){
            currentvalue = document.getElementById('enableButton').value;
            if(currentvalue == "Off"){
              document.getElementById("enableButton").value="On";
              callback1.call();
              EnableButton.innerHTML='DISABLE';
              var resize=document.createElement('img');
              resize.src='../resources/images/disable.png';
              resize.style.height='20px';
              resize.style.width='20px';
              EnableButton.appendChild(resize);
            }else{
              document.getElementById("enableButton").value="Off";
              callback2.call();
              EnableButton.innerHTML='ENABLE ';
              var resize=document.createElement('img');
              resize.src='../resources/images/resize.png';
              resize.style.height='20px';
              resize.style.width='20px';
              EnableButton.appendChild(resize);
            }

          }

          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = '.enableButton:hover{border-color: #666 #aaa #bbb #888;  border-width:4px 3px 3px 4px;background-image:radial-gradient(circle,#CCFFFF,#66CCFF);#CCFFFF;  color:#000;} ';
          document.getElementsByTagName('head')[0].appendChild(style);
          var EnableButton=document.createElement('div');
          EnableButton.id='enableButton';
          EnableButton.className='EnableButton';
          EnableButton.value='Off';
          EnableButton.innerHTML='ENABLE ';
          EnableButton.onclick=onoff;

          EnableButton.style.transition='opacity .1s cubic-bezier(0.4, 0.0, 1, 1), color .1s cubic-bezier(0.4, 0.0, 1, 1)';
          EnableButton.style.height='100%';
          EnableButton.style.margin='0 12px';
          EnableButton.style.width='110px';
          EnableButton.style.textAlign='center';
          EnableButton.style.cursor='pointer';
          EnableButton.style.lineHeight='24px';
          var resize=document.createElement('img');
          resize.src='../resources/images/resize.png';
          resize.style.height='20px';
          resize.style.width='20px';
          EnableButton.appendChild(resize);

          customizePanel.appendChild(EnableButton);



          var register=function(){
            callback3.call();
            EnableButton.value='Off';
            EnableButton.innerHTML='ENABLE ';
            var resize=document.createElement('img');
            resize.src='../resources/images/resize.png';
            resize.style.height='20px';
            resize.style.width='20px';
            EnableButton.appendChild(resize);
          }

          var SaveButton=document.createElement('div');
          //DisableButton.id='disableButton';
          SaveButton.innerHTML='REGISTER';
          SaveButton.onclick=register;
          SaveButton.className='enableButton';
          SaveButton.style.transition='opacity .1s cubic-bezier(0.4, 0.0, 1, 1), color .1s cubic-bezier(0.4, 0.0, 1, 1)';
          SaveButton.style.height='100%';
          SaveButton.style.margin='0 12px';
          SaveButton.style.width='110px';
          SaveButton.style.textAlign='center';
          SaveButton.style.cursor='pointer';
          SaveButton.style.lineHeight='24px';
          var save=document.createElement('img');
          save.src='../resources/images/save.png';
          save.style.height='20px';
          save.style.width='20px';
          SaveButton.appendChild(save);

          customizePanel.appendChild(SaveButton);

          customizePanel.style.position="absolute";
          customizePanel.style.top=0;
          customizePanel.style.right=20;
          customizePanel.style.height='48px';
          customizePanel.style.zIndex="999";
          customizePanel.style.boxShadow='0px 3px 2px rgba(0, 0, 0, 0.2)';
          customizePanel.style.fontFamily='RobotoDraft, "Helvetica Neue", Helvetica, Arial';
          customizePanel.style.backgroundColor='#66CCFF';
          customizePanel.style.color='#fff';
          document.body.appendChild(customizePanel);

          //web component
          /*
          var customizePanel=document.createElement('paper-tabs');

          customizePanel.selected='0';

          enableButton=document.createElement('paper-tab');
          enableButton.innerHTML='ENABLE';
          enableButton.onclick=callback1;

          disableButton=document.createElement('paper-tab');
          disableButton.innerHTML='DISABLE';
          disableButton.onclick=callback2;

          saveButton=document.createElement('paper-tab');
          saveButton.innerHTML='SAVE';
          saveButton.onclick=callback3;

          customizePanel.appendChild(enableButton);
          customizePanel.appendChild(disableButton);
          customizePanel.appendChild(saveButton);

          customizePanel.style.backgroundColor='#66CCFF';
          customizePanel.style.color='#fff';
          customizePanel.style.boxShadow='0px 3px 2px rgba(0, 0, 0, 0.2)';
          customizePanel.style.fontFamily='RobotoDraft, "Helvetica Neue", Helvetica, Arial';
          customizePanel.style.position='absolute';
          customizePanel.style.top=0;
          customizePanel.style.right=20;
          customizePanel.style.zIndex="999";

          document.body.appendChild(customizePanel);
          */





        }
        this.infoPanel = function (_title,content,width,x,y){
            var infopanel = document.createElement('div');
            var title = document.createElement('div');
            title.innerHTML=_title;
            title.style.textAlign="center";
            title.style.background="url(../resources/images/TitleBackground.png)";
            title.style.color = "white";
            infopanel.style.width = width;
            var contentdiv = document.createElement('div');
            contentdiv.style.background ="url(../resources/images/PaneBackground.png)";
            contentdiv.innerHTML=content;
            contentdiv.style.color="white";
            contentdiv.style.padding="5px";
            infopanel.style.position="absolute";
            infopanel.style.top=y;
            infopanel.style.left=x;
            infopanel.style.zIndex="999";
            infopanel.appendChild(title);
            infopanel.appendChild(contentdiv);
            document.body.appendChild(infopanel);
            setTimeout(function(){
              document.body.removeChild(infopanel);
            },6500);
        }
        this.notification=function(_title,message,time){
            var panel = document.createElement('div');
            var title = document.createElement('div');

            var icon=document.createElement('img');
            icon.src='../resources/images/notification.png';
            icon.style.width='12%';
            icon.style.height='3%';
            icon.style.position='relative';
            icon.style.cssFloat="left";

            title.appendChild(icon);
            title.innerHTML=title.innerHTML+"<span>"+_title+"</span>";
            title.style.textAlign="center";
            title.style.background="url(../resources/images/TitleBackground.png)";
            title.style.color = "white";
            panel.style.width = '200px';
            var contentdiv = document.createElement('div');
            contentdiv.style.background ="url(../resources/images/PaneBackground.png)";
            contentdiv.innerHTML=message;
            contentdiv.style.color="white";
            contentdiv.style.padding="5px";
            panel.style.position="absolute";
            panel.style.bottom='5%';
            panel.style.right='5%';
            panel.style.zIndex="999";
            panel.appendChild(title);
            panel.appendChild(contentdiv);
            document.body.appendChild(panel);
            setTimeout(function(){
              document.body.removeChild(panel);
            },time);
        }
        this.addMovablePanel = function (cmp){

          var panel = document.createElement('div');
          var title = document.createElement('div');

          var icon=document.createElement('img');
          var icondiv =document.createElement('span');
          //icondiv.style.position="relative";
          var timer = 0;

          if (mediascape.Agent.data['touchable']){
            Polymer.addEventListener(cmp,'touchend',function(event){
                /** chrome beta sends touchend instead of mouseup **/
                var mouseupEvent = document.createEvent ('MouseEvents');
                mouseupEvent.initEvent ('mouseup', true, true);
                cmp.dispatchEvent(mouseupEvent);
                console.log('mouseup');
            },false);

          Polymer.addEventListener(cmp,'holdpulse',function(event){
              console.log("HOLDPULSE");

              if (event.holdTime>1600){
              var agents = mediascape.Communication.getAgents();
              var panel = document.createElement('div');
              panel.style.backgroundColor="white";
              panel.style.opacity="0.85";
              panel.style.color="grey";
              panel.style.top=cmp.offsetTop;
              panel.style.left=cmp.offsetLeft;
              panel.style.width=cmp.clientWidth;
              panel.style.height=cmp.clientHeight;
              panel.style.zIndex="1001";
              panel.style.position="absolute";
              panel.id="movablediv";
              var p = document.createElement('p');
              p.innerHTML = 'Move to: close';
              p.style.background="grey";
              p.style.color="white";
              p.style.marginTop="20%";
              p.style.marginLeft="20%";
              p.style.marginRight="20%";
              p.style.fontSize="120%";
              p.addEventListener('tap',function(e){document.body.removeChild(panel);})
              panel.appendChild(p);
              agents.forEach(function(ag,i,ar){
                  var p = document.createElement('p');
                  p.id = ag.agentid;
                  if (ar.length ===1){
                    p.innerHTML ='no target';
                    p.style.padding="10px";
                    p.style.color='black';
                    p.style.marginLeft="20%";
                    p.style.testAlign="center";
                  }else{
                    if (ag.agentid !=mediascape.Agent.agentId)
                      {
                        p.innerHTML ='client:'+ag.agentid;
                        p.style.padding="10px";
                        p.style.marginLeft="20%";
                        p.style.cursor="pointer";
                        p.style.opacity="1.0";
                        p.addEventListener('click',function(e){
                          //e.preventDefault();
                          //e.stopPropagation();
                          var agenttomoveid =e.srcElement.id;
                          console.log(agenttomoveid);
                          document.body.removeChild(panel);
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setComponentToAgent(agenttomoveid,cmp);

                        },false);
                      }
                  }
                  panel.appendChild(p);
              });
              document.body.appendChild(panel);
              setTimeout(function(){ document.body.removeChild(panel);},3500);
            }
            return true;
        },false);
      }
      else {

          Polymer.addEventListener(cmp,'holdpulse',function(e){


             // e.stopPropagation();
             if (event.holdTime>2000){
              timer=0;
              var agents = mediascape.Communication.getAgents();
              var panel = document.createElement('div');
              panel.style.backgroundColor="white";
              panel.style.opacity="0.85";
              panel.style.color="grey";
              panel.style.top=cmp.offsetTop;
              panel.style.left=cmp.offsetLeft;
              panel.style.width=cmp.clientWidth;
              panel.style.height=cmp.clientHeight;
              panel.style.zIndex="1001";
              panel.style.position="absolute";
              var p = document.createElement('p');
              p.innerHTML = 'Move to: ';
              p.style.background="grey";
              p.style.color="white";
              p.style.marginTop="20%";
              p.style.marginLeft="20%";
              p.style.marginRight="20%";
              p.style.fontSize="120%";
              panel.appendChild(p);
              agents.forEach(function(ag,i,ar){
                  var p = document.createElement('p');
                  p.id = ag.agentid;
                  if (ar.length ===1){
                    p.innerHTML ='no target';
                    p.style.padding="10px";
                    p.style.color='black';
                    p.style.marginLeft="20%";
                    p.style.testAlign="center";
                  }else{
                    if (ag.agentid !=mediascape.Agent.agentId)
                      {
                        p.innerHTML ='client:'+ag.agentid;
                        p.style.padding="10px";
                        p.style.marginLeft="20%";
                        p.style.cursor="pointer";
                        p.style.opacity="1.0";
                        p.addEventListener('click',function(e){
                          e.stopPropagation();
                          var agenttomoveid =e.srcElement.id;
                          console.log(agenttomoveid);
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setComponentToAgent(agenttomoveid,cmp);
                          document.body.removeChild(panel);
                        },false);
                      }
                  }
                  panel.appendChild(p);
              });
              document.body.appendChild(panel);
              setTimeout(function(){ document.body.removeChild(panel);},3500);
            }
        },true);
      }// NOT TOUCHABLE

      }
      this.resizable = function (cmp){

            $('div').resizable();
      }
      this.addAssociationPanel = function (url){
          var associationPanel = document.createElement('span');

          associationPanel.id ="associationPanel";
          associationPanel.style.width="15px";
          associationPanel.style.height='100%';
          associationPanel.style.backgroundColor='rgba(0,128,255,0.6)';
          associationPanel.style.position="absolute";
          associationPanel.style.top="0px";
          associationPanel.style.left="0px";
          associationPanel.style.zIndex="9999";
          associationPanel.style.transition="width 1.5s";
          var arrowPanel = document.createElement('img');
          arrowPanel.style.position="fixed";
          arrowPanel.src="../resources/images/arrow.png";
          arrowPanel.style.marginTop="30%";
          arrowPanel.style.marginLeft="4px";
          arrowPanel.width="30";
          arrowPanel.height="30";
          var arrowoffPanel = document.createElement('img');
          arrowoffPanel.style.position="fixed";
          arrowoffPanel.src="../resources/images/arrow.png";
          arrowoffPanel.style.marginTop="30%";
          arrowoffPanel.style.marginLeft="4px";
          arrowoffPanel.width="30";
          arrowoffPanel.height="30";
          arrowoffPanel.style.display="none";
          arrowoffPanel.style.transform="rotate(180deg)";

          arrowPanel.onclick = function (){
            var width=window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
            associationPanel.style.height=window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
            associationPanel.style.width=width;
            arrowPanel.style.display="none";
             var callback = function(e){
              arrowoffPanel.style.display="block";
              if (!associationPanel.querySelector('div'))
              mediascape.association.createQRcode(url,associationPanel,(30*width/100),(30*width/100),'',(35*width/100),50);
              associationPanel.removeEventListener('webkitTransitionEnd',callback,false);
            }
            var transitionFinished=associationPanel.addEventListener('webkitTransitionEnd', callback);



          }
          arrowoffPanel.onclick = function (){
            associationPanel.style.width="15px";
            arrowPanel.style.display="block";
            arrowoffPanel.style.display="none";
            associationPanel.removeChild(associationPanel.querySelector('div'));
          }

          associationPanel.appendChild(arrowPanel);
          associationPanel.appendChild(arrowoffPanel);
          document.body.appendChild(associationPanel);

      }
      this.hideAssociationPanel = function (){
         try {
         var associationPanel_ = document.querySelector("#associationPanel");
         if (associationPanel_ && associationPanel_.querySelector('div')){
            var arrowPanel = associationPanel_.querySelectorAll('img')[0];
            var arrowoffPanel = associationPanel_.querySelectorAll('img')[1];
            arrowPanel.style.display="block";
            arrowoffPanel.style.display="none";
            associationPanel_.removeChild(associationPanel_.querySelector('div'));
            associationPanel_.style.width="15px";

          }
        }catch (e){console.log(e);}
      }


   }
    uiComponents.__moduleName = "uiComponents";
    return uiComponents;

  });
