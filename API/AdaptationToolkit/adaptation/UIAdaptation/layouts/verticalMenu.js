define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var verticalMenu = new LayoutConstructor('verticalMenu');
     verticalMenu.listeners = [];
    var selectedComponent='';
    var upTimer='';
    var downTimer='';
    var timer='';
    verticalMenu.onComponentsChange = function (cmps){
        console.log("test");
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
        //document.querySelector('x-media').play();
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
    verticalMenu.render = function (cmps,show,resize){

    var container=document.querySelector('#componentsContainer');
    container.style.display='inline-block';
    container.style.overflowX='';

    var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
    var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;

    var ordered_cmps=[];
    ordered_cmps = cmps.sort(function(it1,it2){
    if (it1.lproperties.order > it2.lproperties.order) return 1;
    else return -1;
    });

    ordered_cmps[0].style.width=width+'px';
    ordered_cmps[0].style.height=height+'px';
    selectedComponent=ordered_cmps[0].id;

    for(var i=1;i<ordered_cmps.length;i++){
      ordered_cmps[i].style.display='none';
      ordered_cmps[i].style.width=width+'px';
      ordered_cmps[i].style.height=height+'px';

    }
    var div=document.createElement('div');
    div.id='menu';
    div.style.display='none';
    div.style.position='absolute';
    div.style.fontFamily='Nunito, arial, verdana';

    div.style.top=0;
    div.style.right=0;
    div.style.zIndex="999";

    var h3=document.createElement('h3');
    var img=document.createElement('img');
    img.src='../resources/images/menu.png';
    img.style.width='20px';
    img.style.marginTop='10px';
    img.style.marginRight='10px';
    h3.style.margin='0';
    h3.style.padding='0';
    h3.appendChild(img);
    h3.innerHTML=h3.innerHTML+'Components';
    h3.style.fontSize='16px';
    h3.style.lineHeight='34px';
    h3.style.padding='0 10px';
    h3.style.background='#003040';
    h3.style.background='linear-gradient(#003040, #002535)';

    div.appendChild(h3);
    ul=document.createElement('ul');
    ul.style.margin='0';
    ul.style.padding='0';
    for(var i=0;i<ordered_cmps.length;i++){
      li=document.createElement('li');
      a=document.createElement('a');
      if(ordered_cmps[i].id===selectedComponent){
        a.style.borderLeft='5px solid red';
      }
      a.innerHTML=ordered_cmps[i].id;
      li.style.listStyleType='none';
      a.style.color='white';
      a.style.textDecoration='none';
      a.style.display='block';
      a.style.fontSize='12px';
      a.style.fontWeight='bold';
      a.style.lineHeight='27px';
      a.style.padding='0px 15px';
      a.style.transition='all 0.15s';
      a.style.cursor='pointer';


      !function outer(a){

        function unhoverFunc(event){
          if(a.innerHTML!==selectedComponent)
          a.style.borderLeft='';
          a.style.background='';
        }

        function hoverFunc(event){
          a.style.background='#003545';
          if(a.innerHTML!==selectedComponent)
          a.style.borderLeft='5px solid lightgreen';
        }

        function clickFunc(event){
          componentsContainer.querySelector('#'+event.srcElement.innerHTML).style.display='block';
          a.style.borderLeft='5px solid red';
          selectedComponent=event.srcElement.innerHTML;

          for(var i=0;i<ordered_cmps.length;i++){
            if(ordered_cmps[i].id!==event.srcElement.innerHTML){
              ordered_cmps[i].style.display='none';
               document.querySelector('#menu').querySelectorAll('a')[i].style.borderLeft='';
            }

          }

        }
        Polymer.addEventListener(a,'tap',clickFunc,true);
        Polymer.addEventListener(a,'mouseout',unhoverFunc,true);
        Polymer.addEventListener(a,'mouseover',hoverFunc,true);
        verticalMenu.listeners.push(clickFunc);
        verticalMenu.listeners.push(unhoverFunc);
        verticalMenu.listeners.push(hoverFunc);
      }(a);
      li.appendChild(a);
      ul.appendChild(li);
      //ul.style.display='none';

    }

    /*function ulHoverFunc(event){
      ul.style.display='block';
    }
    function ulUnhoverFunc(event){
      ul.style.display='none';
    }
    Polymer.addEventListener(div,'mouseover',ulHoverFunc,true);
    Polymer.addEventListener(div,'mouseout',ulUnhoverFunc,true);
    verticalMenu.listeners.push(ulHoverFunc);
    verticalMenu.listeners.push(ulUnhoverFunc);*/
    div.style.background='#004050';
    div.style.width='250px';
    div.style.margin='auto 0 auto';
    div.style.color='white';
    div.style.boxShadow='0 5px 15px 1px rgba(0, 0, 0, 0.6), 0 0 200px 1px rgba(255, 255, 255, 0.5)';

    div.appendChild(ul);
    document.body.appendChild(div);
    mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();


    }
    verticalMenu.onOrientationChange = function (cmps){
      console.log("test");
    }
    verticalMenu.onLayoutChangeEvent = function (cmps){
      console.log("layout changed");
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
        //document.querySelector('x-media').play();

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
    verticalMenu.onResizeEvent=function(cmps){

      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
      for(var i=0;i<cmps.length;i++){

      cmps[i].style.width=width+'px';
      cmps[i].style.height=height+'px';

    }
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();

    }
    verticalMenu.onActivity=function(cmps){
      document.querySelector('#menu').style.animationName='menuDown';
      document.querySelector('#menu').style.animationDuration='1s';
      this.downTimer=setTimeout(function(){
          if(document.querySelector('#menu')){
          document.querySelector('#menu').style.display='block';
        }
        },1000);

      this.timer=setTimeout(function(){
        document.querySelector('#menu').style.animationName='menuUp';
        document.querySelector('#menu').style.animationDuration='1s';
        this.upTimer=setTimeout(function(){
          document.querySelector('#menu').style.display='none';
        },500);


       },3000);
      return this.timer;
    }
    verticalMenu.unload = function(cmps){

      verticalMenu.listeners.forEach (function(listener){
          for(var i=0;i< document.querySelector('#menu').querySelectorAll('a').length;i++){
            document.querySelector('#menu').querySelectorAll('a')[i].removeEventListener('tap',listener);
            document.querySelector('#menu').querySelectorAll('a')[i].removeEventListener('mouseover',listener);
            document.querySelector('#menu').querySelectorAll('a')[i].removeEventListener('mouseout',listener);

          }

      },this);
      clearTimeout(this.downTimer);
      clearTimeout(this.upTimer);
      clearTimeout(this.timer);
    }





    verticalMenu.__moduleName = "verticalMenuLayout";
    return verticalMenu;

  });
