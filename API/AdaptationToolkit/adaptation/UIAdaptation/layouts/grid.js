define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var grid = new LayoutConstructor('grid');
    grid.onComponentsChange = function (cmps){
        console.log("test");
      var components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
      for(var i=0;i<components.length;i++){
        components[i].className='';
        components[i].style.width='';
        components[i].style.height='';
        components[i].style.gridColumn='';
        components[i].style.gridRow='';

        components[i].style.order='';
      }
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

        this.render(cmps);
    }
    grid.render = function (cmps){


      var container=document.querySelector('#componentsContainer');
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
    grid.onOrientationChange = function (cmps){
      console.log("test");
    }
    grid.onLayoutChangeEvent = function (cmps){
      console.log("layout changed");

      for(var i=0;i<cmps.length;i++){
        cmps[i].style.width='';
        cmps[i].style.height='';
        cmps[i].style.gridColumn='';
        cmps[i].style.gridRow='';
        cmps[i].className='';
        cmps[i].style.order='';
      }
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
      if(document.querySelector('#customizePanel')!=null){
        document.body.removeChild(document.querySelector('#customizePanel'));
        if(document.querySelector('drag-resize')!=null){
          componentsContainer.removeChild(document.querySelector('drag-resize'));
        }
      }
      this.render(cmps);
    }
    grid.onResizeEvent=function(cmps){
      console.log("layout changed");
      for(var i=0;i<cmps.length;i++){
        cmps[i].className='';
      }
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
      this.render(cmps);
    }
    grid.unload = function(cmps){}

    grid.__moduleName = "gridLayout";
    console.log(grid);
    return grid;

  });
