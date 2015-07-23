define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var customGrid = new LayoutConstructor('customGrid');
    customGrid.onComponentsChange = function (cmps){
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
      

      

      var enableResizeCallback= function(){
        if(document.querySelector('drag-resize')!=null){
            componentsContainer.removeChild(document.querySelector('drag-resize'));
          }

          for(var i=0;i<cmps.length;i++){
            cmps[i].style.top=cmps[i].offsetTop+'px';
            cmps[i].style.left=cmps[i].offsetLeft+'px';

          }
          for(var i=0;i<cmps.length;i++)
          {
            cmps[i].style.position='absolute';
          }

          var dragResizeCmp=document.createElement('drag-resize');
          componentsContainer.appendChild(dragResizeCmp);

      }
      var scope=this;
      var disableResizeCallback=function(){


        if(document.querySelector('drag-resize')!=null){
            componentsContainer.removeChild(document.querySelector('drag-resize'));
            var distances=[];
            for(var i=0;i<cmps.length;i++){
              cmps[i].lproperties.propx=cmps[i].style.width.split('px')[0];
              cmps[i].lproperties.propy=cmps[i].style.height.split('px')[0];
              cmps[i].lproperties.rwidth=cmps[i].style.width;

              cmps[i].style.position='';
              distances.push(Math.sqrt(Math.pow(parseInt(cmps[i].style.top.split('px')[0]),2)+Math.pow(parseInt(cmps[i].style.left.split('px')[0]),2)));

            }

            var indexes = new Array(distances.length);
            for (var i = 0; i < distances.length; ++i) indexes[i] = i;
            indexes.sort(function (a, b) { return distances[a] < distances[b] ? -1 : distances[a] > distances[b] ? 1 : 0; });
            for(var i=0;i<cmps.length;i++){
              cmps[indexes[i]].lproperties.order=i+1;
            }
           scope.render(cmps);
          }
      }
      var saveLayoutCallback=function(){
          if(document.querySelector('drag-resize')!=null){
            componentsContainer.removeChild(document.querySelector('drag-resize'));
          }
      }
      mediascape.AdaptationToolkit.uiComponents.customPanel(enableResizeCallback,disableResizeCallback,saveLayoutCallback);

    }
    customGrid.render = function (cmps){



      var container=document.querySelector('#componentsContainer');

      container.style.overflowX='';

      container.style.display='grid';
      container.style.gridAutoFlow='row dense';

      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;

     var columns = Math.round(width/10);
     var r=Math.round(height/10);
     var c_width=(width)/columns;
     var r_height=(height)/r;

     container.style.gridTemplateColumns='repeat('+columns+','+c_width+'px)';
     container.style.gridTemplateRows='repeat('+r+','+r_height+'px)';

     for(var i=0;i<cmps.length;i++)
     {
        cmps[i].style.order=cmps[i].lproperties.order;
        cmps[i].style.gridColumn='span '+Math.round(parseInt(cmps[i].lproperties.rwidth.split('px')[0])/c_width);
        cmps[i].style.width=Math.round(parseInt(cmps[i].lproperties.rwidth.split('px')[0])/c_width)*c_width+'px';
        cmps[i].style.height=(Math.round(parseInt(cmps[i].lproperties.rwidth.split('px')[0])/c_width)*c_width*cmps[i].lproperties.propy)/cmps[i].lproperties.propx+'px';
        cmps[i].style.gridRow='span '+Math.round(parseInt(cmps[i].style.height.split('px')[0])/r_height);
        cmps[i].style.backgroundColor='black';


     }

    }
    customGrid.onOrientationChange = function (cmps){
      console.log("test");
    }
    customGrid.onLayoutChangeEvent = function (cmps){
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
      



      var enableResizeCallback= function(){
        if(document.querySelector('drag-resize')!=null){
            componentsContainer.removeChild(document.querySelector('drag-resize'));
          }
          for(var i=0;i<cmps.length;i++){
            cmps[i].style.top=cmps[i].offsetTop+'px';
            cmps[i].style.left=cmps[i].offsetLeft+'px';

          }
          for(var i=0;i<cmps.length;i++)
          {
            cmps[i].style.position='absolute';
          }

          var dragResizeCmp=document.createElement('drag-resize');
          componentsContainer.appendChild(dragResizeCmp);

      }
      var scope=this;
      var disableResizeCallback=function(){


        if(document.querySelector('drag-resize')!=null){
            componentsContainer.removeChild(document.querySelector('drag-resize'));
            var distances=[];
            for(var i=0;i<cmps.length;i++){
              cmps[i].lproperties.propx=cmps[i].style.width.split('px')[0];
              cmps[i].lproperties.propy=cmps[i].style.height.split('px')[0];
              cmps[i].lproperties.rwidth=cmps[i].style.width;

              cmps[i].style.position='';
              distances.push(Math.sqrt(Math.pow(parseInt(cmps[i].style.top.split('px')[0]),2)+Math.pow(parseInt(cmps[i].style.left.split('px')[0]),2)));

            }
            for(var i=0;i<cmps.length;i++){
             cmps[i].style.top='';
              cmps[i].style.left='';

            }
            var indexes = new Array(distances.length);
            for (var i = 0; i < distances.length; ++i) indexes[i] = i;
            indexes.sort(function (a, b) { return distances[a] < distances[b] ? -1 : distances[a] > distances[b] ? 1 : 0; });
            for(var i=0;i<cmps.length;i++){
              cmps[indexes[i]].lproperties.order=i+1;
            }
            scope.render(cmps);
          }
      }
      var saveLayoutCallback=function(){
          if(document.querySelector('drag-resize')!=null){
            componentsContainer.removeChild(document.querySelector('drag-resize'));
          }
      }
      mediascape.AdaptationToolkit.uiComponents.customPanel(enableResizeCallback,disableResizeCallback,saveLayoutCallback);

    }

    customGrid.onResizeEvent=function(cmps){
      console.log("layout changed");
      for(var i=0;i<cmps.length;i++){
        cmps[i].className='';
      }
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
      this.render(cmps);
    }
    customGrid.unload = function(cpms){

    }
    customGrid.__moduleName = "customGridLayout";
    console.log(customGrid);
    return customGrid;

  });
