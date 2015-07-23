define (["msv","mcorp","magicui","magic"],
    function (msv,mcorp,magicui,magic) {

    var sharedMotion = function(){
      this.init = function(){
          this.mapp = MCorp.app("5755267014547000624", {anon:true});
          this.mapp.cams = {};
          this.mapp.init();
          this.mapp.run =function (){
          var event = new CustomEvent("motion-ready", {"detail":{"loaded":true}});
          document.dispatchEvent(event);
       }
     }
      //this.mapp.run = this.toRun.bind(this);
      this.addVideo = function (video,_id,_skew){
        var skew = _skew || 0.0;
        if (video){
          //  var loaderManager = document.querySelector('ms-app').shadowRoot.querySelector('ms-componentManager').shadowRoot.querySelector('ms-loaderManager');
            var scope = this;
            var _video = video;
            //this.options.skew = skew;
          //  var isOn = e.detail.actualLoadedc.indexOf(_id)>-1;
        //    console.log(isOn,e.detail.actualLoadedc,_id,skew);
            var id = _video.attr ('id');
            scope.mapp.msvs.shared.query();
            var opts = {};
            opts.skew = skew;
            console.log(opts);
            scope.mapp.cams[id] = new TM.MediaSync(_video, scope.mapp.msvs.shared, opts);
         }
         else
            throw new Error ("video without defined");
      }
      this.addMovingCursor = function(data){
        this.cursor = TM.movingCursor(this.mapp.motions.shared, data);
      }
      return this;
    }
    document.addEventListener('mediascape-ready',function(){mediascape.Communication.sharedmotion().init();});
    sharedMotion.__moduleName = "sharedmotion";
    return sharedMotion;

    });
