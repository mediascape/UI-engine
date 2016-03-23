define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
function(LayoutConstructor){

  var accordion = new LayoutConstructor('accordion');
  accordion.listeners = [];
  var timeout='';
  var bigComponent='';
  accordion.onComponentsChange = function (cmps){
    this.cmps = cmps;
    var components = mediascape.AdaptationToolkit.componentManager.core.getComponents();

    for(var i=0;i<components.length;i++){
      components[i].style.width='';
      components[i].style.height='';
      components[i].style.gridColumn='';
      components[i].style.gridRow='';
      components[i].className='';
      components[i].style.order='';
      components[i].style.position='';
      components[i].style.backgroundColor='';
      components[i].style.marginLeft='';
      components[i].style.float='';
      components[i].style.zIndex='';
      components[i].style.boxShadow='';
      components[i].style.borderLeft='';
      components[i].style.animationName='';
      components[i].style.animationDuration='';
      //components[i].style.display='block';

      components[i].style.left='';
      components[i].style.transformOrigin= '';
      components[i].style.outline='';
      components[i].style.transform='';

    }
    componentsContainer.style.backgroundColor='';
    componentsContainer.style.perspective='';
    if(document.querySelector('#layout_classes')!=null){
      document.head.removeChild(document.querySelector('#layout_classes'));
    }
    for(var i=1;i<components.length;i++){
      if(document.querySelector('#compDiv'+i)!=null){
        componentsContainer.removeChild(document.querySelector('#compDiv'+i));
      }
    }
    if(document.querySelector('#menu_container')!=null){
      componentsContainer.removeChild(document.querySelector('#menu_container'));
    }
    if(document.querySelector('#menu')!=null){
      document.body.removeChild(document.querySelector('#menu'));
    }
    for(var i=0;i<components.length;i++){
      if(document.querySelector('#name'+components[i].id)!=null){
        componentsContainer.removeChild(document.querySelector('#name'+components[i].id));
      }
    }
    if(document.querySelector('#downArrowImg')!=null){
      document.body.removeChild(document.querySelector('#downArrowImg'));
    }
    if(document.querySelector('#upArrowImg')!=null){
      document.body.removeChild(document.querySelector('#upArrowImg'));
    }

    if(componentsContainer.querySelector('figure')){
      while (componentsContainer.querySelector('figure').firstChild)
      {
        componentsContainer.querySelector('figure').parentNode.insertBefore(componentsContainer.querySelector('figure').firstChild,
        componentsContainer.querySelector('figure'));
      }
      componentsContainer.querySelector('figure').parentNode.removeChild(componentsContainer.querySelector('figure'));
      document.querySelector('x-media').play();

    }
    if(componentsContainer.querySelector('#arrows')){
      componentsContainer.removeChild(componentsContainer.querySelector('#arrows'));
    }
    if(componentsContainer.querySelector('#back')){
      componentsContainer.removeChild(componentsContainer.querySelector('#back'));
    }

    this.render(cmps);

    if(document.querySelector('#customizePanel')!=null){
      document.body.removeChild(document.querySelector('#customizePanel'));
      if(document.querySelector('drag-resize')!=null){
        componentsContainer.removeChild(document.querySelector('drag-resize'));
      }
    }


  }
  accordion.render = function (cmps){

    var components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
    for(var i=0;i<components.length;i++){
      components[i].className='';
      components[i].style.width='';
      components[i].style.height='';
      components[i].style.order='';
    }
    var container=document.querySelector('#componentsContainer');
    container.style.display='inline-block';
    container.style.overflowX='hidden';

    container.style.whiteSpace='nowrap';


    var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
    width=width-0;
    var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
    var comp_num=cmps.length;
    var comp_width=width/comp_num;


    container.style.height=height;
    //container.style.width=width;

    var ordered_cmps=[];
    ordered_cmps = cmps.sort(function(it1,it2){
      if (it1.lproperties.order > it2.lproperties.order) return 1;
      else return -1;
    });
    if(ordered_cmps.length===1){
      ordered_cmps[0].style.position='absolute';
      ordered_cmps[0].style.width=width+'px';
      ordered_cmps[0].style.height=height+'px';
      ordered_cmps[0].style.backgroundColor='white';
      ordered_cmps[0].style.marginLeft=0;
      ordered_cmps[0].style.float='left';
      ordered_cmps[0].style.zIndex=1;
      ordered_cmps[0].style.boxShadow='0 0 15px 5px rgba(0, 0, 0, 0.5)';
      ordered_cmps[0].style.borderLeft='1px solid #888';
    }
    else{
    for(var i=0;i<cmps.length;i++)
    {


      ordered_cmps[i].style.position='absolute';
      ordered_cmps[i].style.width=comp_width+'px';
      ordered_cmps[i].style.height=height+'px';
      ordered_cmps[i].style.backgroundColor='white';
      ordered_cmps[i].style.marginLeft=comp_width*i;
      ordered_cmps[i].style.float='left';
      ordered_cmps[i].style.zIndex=i;
      ordered_cmps[i].style.boxShadow='0 0 15px 5px rgba(0, 0, 0, 0.5)';
      ordered_cmps[i].style.borderLeft='1px solid #888';
      //ordered_cmps[i].style.animationName='move';

      //ordered_cmps[i].style.animationDuration="1s";
      // ordered_cmps[i].style.transition=WebkitTransition = "all 2s";

      !function outer(i){

        function mouseOverFunc(event){

          if(this.timeout) clearTimeout(this.timeout);
          if(bigComponent===event.srcElement.id){clearTimeout(this.timeout);}
          else{this.timeout = setTimeout(ToExecute, 1500);}



        }
        function mouseLeaveFunc(event){
          clearTimeout(this.timeout);

        }

        function ToExecute(){
          for(var j=0;j<ordered_cmps.length;j++){
            if(ordered_cmps[j].id===ordered_cmps[i].id){
              ordered_cmps[i].style.width=0.6*width+'px';
              ordered_cmps[i].style.animationName='';
              ordered_cmps[i].style.animationDuration="";
              ordered_cmps[i].style.marginLeft=(0.4*width)/(ordered_cmps.length-1)*j+'px';/*'calc((40%/'+(ordered_cmps.length-1)+')*'+j+')';*/
              container.querySelector('#name'+ordered_cmps[i].id).style.width=0.6*width+'px';
              container.querySelector('#name'+ordered_cmps[i].id).style.borderLeft='10px solid lightgreen';
              container.querySelector('#name'+ordered_cmps[i].id).style.left=((0.4*width)/(ordered_cmps.length-1)*j)-8+'px';/*'calc((40%/'+(ordered_cmps.length-1)+')*'+j+')';*/
              bigComponent=ordered_cmps[i].id;
            }
            else{


              ordered_cmps[j].style.width=(0.4*width)/(ordered_cmps.length-1)+'px';//'calc(40%/'+(ordered_cmps.length-1)+')';
              container.querySelector('#name'+ordered_cmps[j].id).style.borderLeft='';
              container.querySelector('#name'+ordered_cmps[j].id).style.width=(0.4*width)/(ordered_cmps.length-1)+'px';//'calc(40%/'+(ordered_cmps.length-1)+')';
              if(j<i){
                ordered_cmps[j].style.animationName='shrink';
                ordered_cmps[j].style.animationDuration="1s";
                ordered_cmps[j].style.marginLeft=(0.4*width)/(ordered_cmps.length-1)*j+'px';//'calc((40%/'+(ordered_cmps.length-1)+')*'+j+')';
                container.querySelector('#name'+ordered_cmps[j].id).style.left=((0.4*width)/(ordered_cmps.length-1)*j)-8+'px';//'calc((40%/'+(ordered_cmps.length-1)+')*'+j+')';


              }
              if(j>i){
                ordered_cmps[j].style.animationName='grow';
                ordered_cmps[j].style.animationDuration="1s";
                ordered_cmps[j].style.marginLeft=(0.4*width)/(ordered_cmps.length-1)*(j-1)+(0.6*width)+'px';//'calc((40%/'+(ordered_cmps.length-1)+')*'+(j-1)+')';
                //ordered_cmps[j].style.marginLeft=parseInt(ordered_cmps[j].style.marginLeft.split('calc(')[1].split(')'))+60+'%';
                container.querySelector('#name'+ordered_cmps[j].id).style.left=parseInt(ordered_cmps[j].style.marginLeft.split('px')[0])-8+'px';

              }

            }
          }
          mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
        }

        ordered_cmps[i].removeEventListener('mouseover',mouseOverFunc,true);

        Polymer.addEventListener(ordered_cmps[i],'mouseover',mouseOverFunc,true);
        Polymer.addEventListener(ordered_cmps[i],'mouseleave',mouseLeaveFunc,true);
        accordion.listeners.push(mouseOverFunc);
        accordion.listeners.push(mouseLeaveFunc);

        function tapFunc(event){
          for(var j=0;j<ordered_cmps.length;j++){
            if(ordered_cmps[j].id===ordered_cmps[i].id){
              ordered_cmps[i].style.width=0.9*width+'px';

              ordered_cmps[i].style.marginLeft=(0.1*width)/(ordered_cmps.length-1)*j+'px';//'calc((10%/'+(ordered_cmps.length-1)+')*'+j+')';
              container.querySelector('#name'+ordered_cmps[i].id).style.borderLeft='10px solid lightgreen';
              container.querySelector('#name'+ordered_cmps[i].id).style.width=0.9*width+'px';
              container.querySelector('#name'+ordered_cmps[i].id).style.left=((0.1*width)/(ordered_cmps.length-1)*j)-8+'px';//'calc((10%/'+(ordered_cmps.length-1)+')*'+j+')';
              bigComponent=ordered_cmps[i].id;
              clearTimeout(this.timeout);

            }
            else{

              ordered_cmps[j].style.width=(0.1*width)/(ordered_cmps.length-1)+'px';//'calc(10%/'+(ordered_cmps.length-1)+')';
              container.querySelector('#name'+ordered_cmps[j].id).style.borderLeft='';
              container.querySelector('#name'+ordered_cmps[j].id).style.width=(0.1*width)/(ordered_cmps.length-1)+'px';//'calc(10%/'+(ordered_cmps.length-1)+')';
              if(j<i){
                ordered_cmps[j].style.marginLeft=(0.1*width)/(ordered_cmps.length-1)*j+'px';//'calc((10%/'+(ordered_cmps.length-1)+')*'+j+')';
                container.querySelector('#name'+ordered_cmps[j].id).style.left=((0.1*width)/(ordered_cmps.length-1)*j)-8+'px';//'calc((10%/'+(ordered_cmps.length-1)+')*'+j+')';

              }
              if(j>i){

                ordered_cmps[j].style.marginLeft=(0.1*width)/(ordered_cmps.length-1)*(j-1)+0.9*width+'px';//'calc((10%/'+(ordered_cmps.length-1)+')*'+(j-1)+')';
                //ordered_cmps[j].style.marginLeft=parseInt(ordered_cmps[j].style.marginLeft.split('calc(')[1].split(')'))+90+'%';
                container.querySelector('#name'+ordered_cmps[j].id).style.left=parseInt(ordered_cmps[j].style.marginLeft.split('px')[0])-8+'px';

              }

            }
          }
          mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
        }

        ordered_cmps[i].removeEventListener(tapFunc);




        Polymer.addEventListener(ordered_cmps[i],'hold',tapFunc,true);
        accordion.listeners.push(tapFunc);

      }(i);

      if(document.querySelector('#name'+ordered_cmps[i].id)){
        container.removeChild(document.querySelector('#name'+ordered_cmps[i].id));
      }
      var div=document.createElement('div');
      div.id='name'+ordered_cmps[i].id;
      div.style.background='#003040';
      div.style.background='linear-gradient(#003040, #002535)';
      div.style.opacity='1';
      div.style.fontFamily='Nunito, arial, verdana';

      div.style.position='absolute';
      div.style.left=comp_width*i-8;
      div.style.bottom='0';
      div.style.width=width+'px';
      div.style.textAlign='left';
      div.style.zIndex=i;
      //div.style.marginLeft='9px';


      div.style.transition='all 0.5s';
      container.appendChild(div);

      var a=document.createElement('a');
      a.innerHTML=ordered_cmps[i].id;
      a.style.display='block';
      a.style.color='#fff';
      a.style.textDecoration='none';
      a.style.padding='20px';
      a.style.fontSize='16px';
      div.appendChild(a);
    }
  }
  }
  accordion.onOrientationChange = function (cmps){
    console.log("test");
  }
  accordion.onLayoutChangeEvent = function (cmps){

    for(var i=0;i<cmps.length;i++){
      cmps[i].style.width='';
      cmps[i].style.height='';
      cmps[i].style.gridColumn='';
      cmps[i].style.gridRow='';
      cmps[i].className='';
      cmps[i].style.order='';
      cmps[i].style.position='';
      cmps[i].style.backgroundColor='';
      cmps[i].style.marginLeft='';
      cmps[i].style.float='';
      cmps[i].style.zIndex='';
      cmps[i].style.boxShadow='';
      cmps[i].style.borderLeft='';
      cmps[i].style.animationName='';
      cmps[i].style.animationDuration='';
      cmps[i].style.display='block';

      cmps[i].style.left='';
      cmps[i].style.transformOrigin= '';
      cmps[i].style.outline='';
      cmps[i].style.transform='';

    }
    componentsContainer.style.backgroundColor='';
    componentsContainer.style.perspective='';
    if(document.querySelector('#layout_classes')!=null){
      document.head.removeChild(document.querySelector('#layout_classes'));
    }
    for(var i=1;i<cmps.length;i++){
      if(document.querySelector('#compDiv'+i)!=null){
        componentsContainer.removeChild(document.querySelector('#compDiv'+i));
      }
    }
    if(document.querySelector('#menu_container')!=null){
      componentsContainer.removeChild(document.querySelector('#menu_container'));
    }
    for(var i=0;i<cmps.length;i++){
      if(document.querySelector('#name'+cmps[i].id)!=null){
        componentsContainer.removeChild(document.querySelector('#name'+cmps[i].id));
      }
    }
    if(document.querySelector('#menu')!=null){
      document.body.removeChild(document.querySelector('#menu'));
    }
    if(document.querySelector('#downArrowImg')!=null){
      document.body.removeChild(document.querySelector('#downArrowImg'));
    }
    if(document.querySelector('#upArrowImg')!=null){
      document.body.removeChild(document.querySelector('#upArrowImg'));
    }

    if(componentsContainer.querySelector('figure')){
      while (componentsContainer.querySelector('figure').firstChild)
      {
        componentsContainer.querySelector('figure').parentNode.insertBefore(componentsContainer.querySelector('figure').firstChild,
        componentsContainer.querySelector('figure'));
      }
      componentsContainer.querySelector('figure').parentNode.removeChild(componentsContainer.querySelector('figure'));
      document.querySelector('x-media').play();
    }


    if(componentsContainer.querySelector('#arrows')){
      componentsContainer.removeChild(componentsContainer.querySelector('#arrows'));
    }
    if(componentsContainer.querySelector('#back')){
      componentsContainer.removeChild(componentsContainer.querySelector('#back'));
    }
    this.render(cmps);

    if(document.querySelector('#customizePanel')!=null){
      document.body.removeChild(document.querySelector('#customizePanel'));
      if(document.querySelector('drag-resize')!=null){
        componentsContainer.removeChild(document.querySelector('drag-resize'));
      }
    }


  }
  accordion.onResizeEvent=function(cmps){
    console.log("layout changed");
    for(var i=0;i<cmps.length;i++){
      cmps[i].className='';
    }
    if(document.querySelector('#layout_classes')!=null){
      document.head.removeChild(document.querySelector('#layout_classes'));
    }
    this.render(cmps);
    mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
  }
  accordion.unload = function(cmps){
    accordion.listeners.forEach (function(listener){
      for(var i=0;i<cmps.length;i++){
        cmps[i].removeEventListener('mouseover',listener,true);
        cmps[i].removeEventListener('mouseleave',listener,true);
        Polymer.removeEventListener(cmps[i],'hold',listener,true);
        Polymer.removeEventListener(cmps[i],'hold',listener,false);
      }
    },this);
  }

  accordion.__moduleName = "accordionLayout";
  return accordion;

});
