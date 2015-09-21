define(
  [
  ],
  function(){

    var layoutConstructor =  function (name){
      this.name = name;
      this.onComponentsChange =function(cmps){}
      this.onOrientationChange=function (cmps){}
      this.render= function render (cmps){}

      this.checkForImplementation=function(){
        console.group('Layout '+name);
        if (!this.onComponentsChange  || this.onComponentsChange.getBody().trim().length <4 )console.warn("You must implement onComponentsChange function");
        else
          if (!this.onOrientationChange || this.onOrientationChange.getBody().trim().length <4 )console.warn("You must implement onOrientationChange function");
          else
            if (!this.render || this.render.getBody().trim().length <4 )console.warn("You must implemented render function");
            else
              if (!this.onLayoutChangeEvent || this.onLayoutChangeEvent.getBody().trim().length <4 )console.warn("You must implemented onLayoutChangeEvent function");
              else
                if (!this.onResizeEvent || this.onResizeEvent.getBody().trim().length <4 )console.warn("You must implemented onResizeEvent function");
                  else if (!this.onActivity || this.onActivity.getBody().trim().length <4 ){
                            console.warn("You could need onActivity function but it is not implemented");
                            console.groupEnd();
                            return true;
                        }
                        else {
                        console.log("0 errors");
                        console.groupEnd();
                        return true;
                        }
            console.groupEnd();
          }
        }

        layoutConstructor.__moduleName = "layoutConstructor";
        return layoutConstructor;

      });
