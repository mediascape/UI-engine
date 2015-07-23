define( ["jquery","qrcode"], function($) {
	var Association = function() {
		this.createSessionID = function(){
			console.log('createSession');
			var args = Array.prototype.slice.call(arguments);
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					if(args.length==2){
						var applicationID=args[0];
						var key=args[1];
						var sessionID = applicationID.concat(key);
						resolve('{"sessionID":'+sessionID+'}');
					}else{
						var timeStamp=args[0].toString();
						var applicationID=args[1];
						var key=args[2];
						var sessionID = timeStamp.concat(applicationID,key);
						resolve('{"sessionID":'+sessionID+'}');
					}
				});
			return p1;
		};
		this.createQRcode = function(_url,element,_width,_height,_type,marginLeft,marginTop){
			console.log('createQRcode');
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					var width=_width || "160";
					var height=_height || "160";
					var type=_type;
					var url=_url;
					var username="ionalberdi"; // bit.ly username
					var key="R_978251cf3ed04317a147fde5a237b13c";
					var promise = $.ajax({
						url:"http://api.bit.ly/v3/shorten",
						data:{
							longUrl:url,
							apiKey:key,
							login:username
						},
						dataType:"jsonp"
					})
					.done(function(data, textStatus, jqXHR) {
						console.log(data);
						var shortedUrl = data.data.url;
						var asociationElement=element;
						var associationCode = document.createElement("div");
						associationCode.id=type+"code";
						var hElement = document.createElement("h2");
						hElement.innerHTML=type;
						associationCode.appendChild(hElement);
						var title=document.createElement('div');
              			title.style.color='white';
              			title.innerHTML='Scan for another device';
              			title.style.fontSize='50px';
              			title.style.textAlign='center';
              			title.style.marginTop='50px';
              			associationCode.appendChild(title);
						var qrElement = document.createElement("div");
						qrElement.id=type+"qrcode";
						qrElement.style.width=width+"px";
						qrElement.style.height=height+"px";
						qrElement.style.marginLeft=marginLeft+"px";
						qrElement.style.marginTop=marginTop+"px";
						associationCode.style.transition="width 1.5s";
						associationCode.appendChild(qrElement);
						associationCode.appendChild(document.createElement("br"));
						var urlElement = document.createElement("div");
						urlElement.id="url";
						urlElement.innerHTML=shortedUrl;
						urlElement.style.height="20px";
						urlElement.style.textAlign='center';
						//urlElement.style.marginLeft=marginLeft+"px";
						//urlElement.style.marginTop=marginTop+"px";
						urlElement.style.color='white';
						associationCode.appendChild(urlElement);
						asociationElement.appendChild(associationCode);
						var qrcode = new QRCode(type+"qrcode", {
						    text: shortedUrl,
						    width:width,
						    height:height,
						    colorDark : "#000000",
						    colorLight : "#ffffff",
						    correctLevel : QRCode.CorrectLevel.H
						});
						resolve(shortedUrl);
					});

        });
			return p1;
    };
		this.getAssocatioUrl = function (){
			return this.associationUrl;
		}
	};
	Association.__moduleName = "association";

  	return Association;
});
