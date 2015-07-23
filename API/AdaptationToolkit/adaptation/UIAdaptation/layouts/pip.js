define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){
    var fullScreenCmp;
    var pip = new LayoutConstructor('pip');
    pip.listeners = [];
    pip.onComponentsChange = function (cmps){
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

      var scope=this;
      var timer1=0;
      function holding(event){
            //  event.preventDefault();
              console.log(event.type);
              var holdtime = 0;
              var clicked=event.srcElement;
              var rendered=true;
              var _cmps = cmps;
              function isUp (ev){

                    scope.render(_cmps,rendered,clicked);

              }

              Polymer.addEventListener(event.target,'mouseup',isUp,true);
              setTimeout(function(){
                  event.target.removeEventListener('mouseup',isUp,true);
              },500);


      }

      for(var i=0;i<cmps.length;i++){
        cmps[i].removeEventListener('holding',holding,true);

      }
     for(var i=0;i<cmps.length;i++){
        Polymer.addEventListener(cmps[i],'holding',holding,false);
        pip.listeners.push();
      }



    }
    pip.render = function (cmps,rendered,clicked){


      var container=document.querySelector('#componentsContainer');
      container.style.display='grid';
      container.style.gridAutoFlow='';
      container.style.overflowX='';


      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;



      var a=width-60-Math.round(0.2*width);
      var b=Math.round(width*0.2);

      container.style.gridTemplateColumns=a+'px '+b+'px 30px';

      var col_cmps=cmps.length-1;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;

      var ordered_cmps=[];
      ordered_cmps = cmps.sort(function(it1,it2){
      if (it1.lproperties.order > it2.lproperties.order) return 1;
      else return -1;
      });
      var cmpsToColumn=[];
      if(rendered!=true && rendered!=false ){
       fullScreenCmp=ordered_cmps[0];

        for(var i=1;i<ordered_cmps.length;i++){
          cmpsToColumn.push(ordered_cmps[i]);
        }
      }
      else{
       fullScreenCmp=clicked;
        for(var i=0;i<ordered_cmps.length;i++){
          if(ordered_cmps[i].id!==clicked.id){
            cmpsToColumn.push(ordered_cmps[i]);
          }
        }
      }




      var heights=[];
      var total_height=10;
      heights.push(10);

      var enough=true;

      for(var i=0;i<col_cmps;i++){
          comp_height=b*cmpsToColumn[i].lproperties.propy/cmpsToColumn[i].lproperties.propx;
          if(total_height+comp_height+10>height-40){
            enough=false;
            break;
          }
          else{
            total_height=total_height+comp_height+10;
            heights.push(comp_height);
            heights.push(10);
          }
      }
      if(enough===true){
        heights.push(height-total_height);
        container.style.gridTemplateRows='';
        for(var i=0;i<heights.length;i++){
          container.style.gridTemplateRows=container.style.gridTemplateRows+' '+heights[i]+'px';
        }

          fullScreenCmp.style.gridColumn='1/span 3';
          fullScreenCmp.style.width=(width-30)+'px';
          fullScreenCmp.style.height=(height-40)+'px';
          fullScreenCmp.style.gridRow='1/span '+heights.length;
          fullScreenCmp.style.backgroundColor='black';
          fullScreenCmp.style.zIndex='1';

        for(var i=0;i<col_cmps;i++){

          cmpsToColumn[i].style.gridColumn='2/span 1';
          cmpsToColumn[i].style.width=b+'px';
          cmpsToColumn[i].style.height=heights[(2*i+1)];
          cmpsToColumn[i].style.gridRow=2*i+2;
          cmpsToColumn[i].style.backgroundColor='black';
          cmpsToColumn[i].style.zIndex='2';




        }

      }
      else{
        var row_height=parseInt((height-70)/(col_cmps))-10;
        container.style.gridTemplateRows='10px repeat('+col_cmps+','+row_height+'px 10px) 10px';
        fullScreenCmp.style.gridColumn='1/span 3';
        fullScreenCmp.style.width=(width-30)+'px';
        fullScreenCmp.style.height=(height-40)+'px';
        fullScreenCmp.style.gridRow='1/span '+heights.length;
        fullScreenCmp.style.backgroundColor='black';
        fullScreenCmp.style.zIndex='1';

        for(var i=0;i<col_cmps;i++){

          cmpsToColumn[i].style.gridColumn='2/span 1';
          cmpsToColumn[i].style.width=b+'px';
          cmpsToColumn[i].style.height=row_height+'px';
          cmpsToColumn[i].style.gridRow=2*i+2;
          cmpsToColumn[i].style.backgroundColor='black';
          cmpsToColumn[i].style.zIndex='2';


        }

      }




    }
    pip.onOrientationChange = function (cmps){
      console.log("test");

    }
    pip.onLayoutChangeEvent = function (cmps){
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
      this.render(cmps);


      if(document.querySelector('#customizePanel')!=null){
        document.body.removeChild(document.querySelector('#customizePanel'));
        if(document.querySelector('drag-resize')!=null){
          componentsContainer.removeChild(document.querySelector('drag-resize'));
        }
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
       mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
       var scope=this;
      var timer1=0;

      function holding (event){
            //  event.preventDefault();
              console.log(event.type);
              var holdtime = 0;
              var clicked=event.srcElement;
              var rendered=true;
              var _cmps = cmps;
              function isUp (ev){

                    scope.render(_cmps,rendered,clicked);

              }

              Polymer.addEventListener(event.target,'mouseup',isUp,true);
              setTimeout(function(){
                  event.target.removeEventListener('mouseup',isUp,true);
              },500);


      }

      for(var i=0;i<cmps.length;i++){
        cmps[i].removeEventListener('hold',holding,true);

      }
      for(var i=0;i<cmps.length;i++){
        Polymer.addEventListener(cmps[i],'hold',holding,true);
        pip.listeners.push(holding);

      }

    }
    pip.onResizeEvent=function(cmps){
      console.log("layout changed");
      var rendered=true;
      for(var i=0;i<cmps.length;i++){
        cmps[i].style.width='';
        cmps[i].style.height='';
        cmps[i].style.gridColumn='';
        cmps[i].style.gridRow='';

        cmps[i].style.order='';
      }
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }

      var clicked=fullScreenCmp;
      this.render(cmps,rendered,clicked);
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
    }
    pip.unload = function(cmps){
      pip.listeners.forEach (function(listener){
      for(var i=0;i<cmps.length;i++){
        cmps[i].removeEventListener('hold',listener,true);

      }
    },this);
    }



    pip.__moduleName = "pipLayout";
    console.log(pip);
    return pip;

  }

  );
  window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
  };
