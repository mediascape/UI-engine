define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var menu = new LayoutConstructor('menu');

    menu.onComponentsChange = function (cmps){
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
    menu.render = function (cmps,show,resize){

    var container=document.querySelector('#componentsContainer');
    container.style.display='grid';
    container.style.gridAutoFlow='';
    container.style.overflowX='';

    var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;

    var comp_num=cmps.length-1;
    var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
    main_comp_height=Math.round(0.95*(height-30));
    var space=Math.round(0.05*(height-30));


    container.style.gridTemplateRows=main_comp_height+'px '+space+'px';
    var small_comp_width=parseInt((width-20)/comp_num)-10;
    var margin_w=Math.round(0.3*small_comp_width);
    var comp_width=Math.round(0.4*small_comp_width);
    container.style.gridTemplateColumns='10px repeat('+comp_num+','+margin_w+'px '+comp_width+'px '+margin_w+'px 10px) 10px';


    var ordered_cmps=[];
    ordered_cmps = cmps.sort(function(it1,it2){
    if (it1.lproperties.order > it2.lproperties.order) return 1;
    else return -1;
    });

    var cl = document.createElement('style');
      cl.type = 'text/css';
      cl.id='layout_classes';
      var col_num=2+comp_num*4;
      for(var i=0;i<comp_num+1;i++){

            if(i===0){
              cl.innerHTML = '.class0 {background-color:black;object-fit:fill; grid-column:1/span '+(col_num-1)+';width:'+(width-30)+'px; grid-row:1/span 2;height:'+(main_comp_height+space)+'px;z-index:1;}';
              document.getElementsByTagName('head')[0].appendChild(cl);

              if(resize!=true && resize!=false && show!=true && show!=false){
                ordered_cmps[i].className='class0';
                ordered_cmps[i].style.display='block';
              }
            }
            else{
              var col_start=(4*i)-1;
              cl.innerHTML =cl.innerHTML+ '.class'+i+' {}';
              document.getElementsByTagName('head')[0].appendChild(cl);
              if(resize!=true && resize!=false && show!=true && show!=false){
                ordered_cmps[i].className='class'+i;
               ordered_cmps[i].style.display='none';

              }
            }

      }

    if(show===true)
    {
        for(var i=1;i<ordered_cmps.length;i++){
          var comp_name = document.createElement('div');
          comp_name.id='compDiv'+i;
          comp_name.innerHTML=document.querySelector('.class'+i).getAttribute('name')||document.querySelector('.class'+i).id;
          comp_name.style.gridColumn=(4*i)-1+'/span 1';
          comp_name.style.gridRow=2+'/span 1';

          //comp_name.style.height='100%';
          comp_name.style.textAlign='center';
          comp_name.style.fontSize=0.4*space+'px';
          comp_name.style.fontFamily='arial';
          comp_name.style.zIndex=3;

          comp_name.style.cursor='pointer';
          comp_name.style.color='#fff';
          comp_name.style.position='relative';
          comp_name.style.marginTop=(space/3)+'px';


          comp_name.onclick=function(){
            var aux=event.srcElement.id.split('compDiv')[1];
            document.querySelector('#compDiv'+aux).innerHTML=document.querySelector('.class0').getAttribute('name')||document.querySelector('.class0').id;
            var id0=document.querySelector('.class0').id;
            document.querySelector('.class'+aux).className='class0';
            document.querySelector('#'+id0).className='class'+aux;
            document.querySelector('.class0').style.display='block';
            document.querySelector('.class'+aux).style.display='none';

            //mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();

            //event.srcElement.updateNodes();
          }
          comp_name.ontap=function(){
            var aux=event.srcElement.id.split('compDiv')[1];
            document.querySelector('#compDiv'+aux).innerHTML=document.querySelector('.class0').getAttribute('name')||document.querySelector('.class0').id;
            var id0=document.querySelector('.class0').id;
            document.querySelector('.class'+aux).className='class0';
            document.querySelector('#'+id0).className='class'+aux;
            document.querySelector('.class0').style.display='block';
            document.querySelector('.class'+aux).style.display='none';

            //mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();

            //event.srcElement.updateNodes();
          }
          container.appendChild(comp_name);

        }
        var menu_container=document.createElement('div');
        menu_container.style.gridRow='2/span 1';
        menu_container.style.gridColumn='1/span '+((4*comp_num)+2-1);
        menu_container.style.width=(width-30)+'px';
        menu_container.style.height=Math.round(0.05*(height-30))+'px';

        menu_container.style.zIndex=2;
        menu_container.style.borderRadius='25px';
        menu_container.id='menu_container';
        menu_container.style.background='#fff url("http://img.webme.com/pic/c/cssplantillas/wmp11menu0.png")';
        menu_container.style.border='1px solid #000';
        menu_container.style.borderWidth='0 1px';
        menu_container.style.borderBottom='1px solid #444';

        container.appendChild(menu_container);
     }





    }
    menu.onOrientationChange = function (cmps){
      console.log("test");
    }
    menu.onLayoutChangeEvent = function (cmps){
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
      

      
    }
    menu.onResizeEvent=function(cmps){
      console.log("layout changed");
      var resize=true;
      var show=true;
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
      for(var i=1;i<cmps.length;i++){
        if(document.querySelector('#compDiv'+i)!=null){
            componentsContainer.removeChild(document.querySelector('#compDiv'+i));
        }
      }
       if(document.querySelector('#menu_container')!=null){
              componentsContainer.removeChild(document.querySelector('#menu_container'));
        }
      this.render(cmps,show,resize);
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();

    }
    menu.onActivity=function(cmps){

      var show=true;

      for(var i=1;i<cmps.length;i++){
          if(document.querySelector('#compDiv'+i)!=null){
              componentsContainer.removeChild(document.querySelector('#compDiv'+i));
          }
        }
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
       if(document.querySelector('#menu_container')!=null){
              componentsContainer.removeChild(document.querySelector('#menu_container'));
        }
      this.render(cmps,show);
      var self=this;
      var timer=setTimeout(function(){
      show=false;
        for(var i=1;i<cmps.length;i++){
          if(document.querySelector('#compDiv'+i)!=null){
              componentsContainer.removeChild(document.querySelector('#compDiv'+i));
          }
        }
        if(document.querySelector('#menu_container')!=null){
              componentsContainer.removeChild(document.querySelector('#menu_container'));
        }
        if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
        }
      self.render(cmps,show);
       //mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
      },3000);

      return timer;
    }
    menu.unload = function(cmps){}





    menu.__moduleName = "menuLayout";
    console.log(menu);
    return menu;

  });
