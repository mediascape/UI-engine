define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var explicit = new LayoutConstructor('explicit');
    explicit.onComponentsChange = function (cmps,rule){
      console.log("explicit layout!!!");
      loadcssfile("/resources/explicitCss/"+rule.then.cssFile);
    //  this.render(cmps);
    }
    explicit.render = function (cmps){


      var container=document.querySelector('#componentsContainer');
      container.style.display='grid';
      container.style.gridAutoFlow='column';

      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
      var comp_num=cmps.length;
      width=width-30;


      var r_height=Math.round((height-30)/comp_num);

     container.style.gridTemplateColumns=width+'px';
     container.style.gridTemplateRows='repeat('+comp_num+','+r_height+'px)';


      /*var ordered_cmps=[];
      ordered_cmps = cmps.sort(function(it1,it2){
      if (it1.lproperties.order > it2.lproperties.order) return 1;
      else return -1;
      });*/


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
    explicit.onOrientationChange = function (cmps,rule){
      console.log("onOrientationChange");
      this.render(cmps);
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
    }
    explicit.onLayoutChangeEvent = function (cmps,rule){
      console.log("layout changed");

      console.log("explicit layout!!!");
      loadcssfile("/resources/explicitsCss/"+rule.then.cssFile);

    }
    explicit.onResizeEvent=function(cmps,rule){

      this.render(cmps);
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
    }
    explicit.unload = function(cmps){
      // remove css
    }
    function loadcssfile(filename){

        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        if (typeof fileref!="undefined")
          document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    function removeCss(filename){

        var fileref=document.querySelector("link[rel='"+filename+"']");
        if (typeof fileref!="undefined")
          document.getElementsByTagName("head")[0].removeChild(fileref);
    }



    explicit.__moduleName = "explicitLayout";
    return explicit;

  });
