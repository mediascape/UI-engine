define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var slider = new LayoutConstructor('slider');
    slider.onComponentsChange = function (cmps){
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
        components[i].style.display='block';

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
      for(var i=0;i<components.length;i++){
        if(document.querySelector('#name'+components[i].id)!=null){
            componentsContainer.removeChild(document.querySelector('#name'+components[i].id));
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
    slider.render = function (cmps){

      var components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
     
      for(var i=0;i<components.length;i++){
        components[i].className='';
        components[i].style.width='';
        components[i].style.height='';
        components[i].style.gridColumn='';
        components[i].style.gridRow='';

        components[i].style.order='';
      }
      var container=document.querySelector('#componentsContainer');
      container.style.display='grid';
      container.style.gridAutoFlow='column';
       //container.style.overflowX='';
      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
      var comp_num=cmps.length;
      width=width;


      var r_height=height;

     container.style.gridTemplateColumns=width+'px';
     container.style.gridTemplateRows='repeat(1,'+r_height+'px)';



     for(var i=0;i<cmps.length;i++)
     {

        cmps[i].style.order=cmps[i].lproperties.order;
        cmps[i].style.gridColumn='span 1';
        cmps[i].style.width=width+'px';
        cmps[i].style.height=r_height+'px';
        cmps[i].style.gridRow='span 1';
        cmps[i].style.backgroundColor='black';
     }

    }
    slider.onOrientationChange = function (cmps){
      console.log("test");
    }
    slider.onLayoutChangeEvent = function (cmps){
      console.log("layout changed");
      document.querySelector('#componentsContainer').style.webkitTransition="width 2s, height 2s, transform 2s;";
      var div = document.createElement('div');
      div.id="buttons";
      div.innerHTML ='<section class="nav" style="width:200px;position:absolute;z-index:999;top:85%;left:95%;"> <div layout horizontal><paper-fab id="btnback" start-justified icon="icons:arrow-back" id="preBtn" "><paper-shadow z="5"></paper-shadow></paper-fab></div><div layout horizontal><paper-fab id="btnfwd" icon="icons:arrow-forward" id="nextBtn" ><paper-shadow z="5"></paper-shadow></paper-fab></div></section>';
      document.body.appendChild(div);
      this.cmps = cmps;
      this.idx = 0;
      var _cmps = this.cmps.filter (function(cmp,i){
          if (this.idx === i){
          cmp.style.display="block";
          cmp.style.width="100%";
           return true;
         }
          else {
            cmp.style.display="none";
            cmp.style.width="0%";
            return false;
          }
      },this);
      this.idx++;
      console.log(_cmps);
      var _this = this;
      Polymer.addEventListener(document.querySelector('#btnfwd'),'tap',function(e){
        console.log("barruan2");
        var  cmps = this.cmps.filter (function(cmp,i){
              if (this.idx === i) {
                cmp.style.display="block";
                cmp.style.width="100%";
                return true;
              }
              else {
                cmp.style.display="none";
                cmp.style.width="0%";
                return false;
                }
          },this);
          if (this.idx < this.cmps.length-1) this.idx++;
          else this.idx = 0;
          this.render(cmps);
      }.bind(this),true);
      Polymer.addEventListener(document.querySelector('#btnback'),'tap',function(e){
        console.log("barruan");
        var  cmps = _this.cmps.filter (function(cmp,i){
              if (this.idx === i) {
                cmp.style.display="block";
                cmp.style.width="100%";
                return true;
              }
              else {
                cmp.style.display="none";
                cmp.style.width="0%";
                return false;
              }
          },_this);
          if (this.idx > 0)this.idx--;
          else this.idx = this.cmps.length-1;
          this.render(cmps);
      }.bind(this),true);
      var components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
      for (var cp in components)
      {
        components[cp].style['transition']="opacity 2s";
        Polymer.addEventListener(components[cp],'trackend',function(e){
           if (e.xDirection>0){ //eskubi
             var  cmps = this.cmps.filter (function(cmp,i){
                   if (this.idx === i) {
                     cmp.style.display="block";
                     cmp.style.opacity="1";
                     return true;
                   }
                   else {
                     cmp.style.display="none";
                     cmp.style.opacity="0";
                     return false;
                     }
               },this);
               if (this.idx < this.cmps.length-1) this.idx++;
               else this.idx = 0;
               this.render(cmps);
           }
           else { //ezker
             var  cmps = _this.cmps.filter (function(cmp,i){
                   if (this.idx === i) {
                     cmp.style.display="block";
                     cmp.style.opacity="1";
                     return true;
                   }
                   else {
                     cmp.style.display="none";
                     cmp.style.opacity="0";;
                     return false;
                   }
               },_this);
               if (this.idx > 0)this.idx--;
               else this.idx = this.cmps.length-1;
               this.render(cmps);
        }
      }.bind(this),true);
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
      if(document.querySelector('#menu')!=null){
          document.body.removeChild(document.querySelector('#menu'));
      }
      if(document.querySelector('#customizePanel')!=null){
        document.body.removeChild(document.querySelector('#customizePanel'));
        if(document.querySelector('drag-resize')!=null){
          componentsContainer.removeChild(document.querySelector('drag-resize'));
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

      }
      if(componentsContainer.querySelector('#arrows')){
        componentsContainer.removeChild(componentsContainer.querySelector('#arrows'));
      }
      if(componentsContainer.querySelector('#back')){
        componentsContainer.removeChild(componentsContainer.querySelector('#back'));
      }

      this.render(_cmps);

    }
    slider.onResizeEvent=function(cmps){
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
    slider.unload = function(cmps){
       var div = document.querySelector('#buttons');
       document.body.removeChild(div);
    }

    slider.__moduleName = "sliderLayout";
    console.log(slider);
    return slider;

  });