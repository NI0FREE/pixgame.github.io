<!DOCTYPE html>
<html lang="en">
    <head>
        <style text="text/css">
            * { margin:0; padding:0; }
            html, body { width:100%; height:100%; }
            canvas { display:block; }
            
              .onlineform{
                top: calc(var(--safe-area-inset-top) + 10px);
                top: 10px;
                padding: 9px 12px;
                padding-top: 9px;
                padding-right: 12px;
                padding-bottom: 9px;
                padding-left: 12px;
                line-height: 18px;
                background-color: rgba(40,43,46,.2);
                border-radius: 7px;
                border-top-left-radius: 7px;
                border-top-right-radius: 7px;
                border-bottom-right-radius: 7px;
                border-bottom-left-radius: 7px;
                position: fixed;
                z-index: 10;
                background-color: rgba(40,43,46,.2);
                color: #fff;
                font-size: 14px;
                line-height: 19px;
                font-weight: 500;
                padding: 10px 12px 7px;
                border-radius: 10px;
                left: 8px;
                font-family: var(--font-android);
                font-family: Roboto,Arial;
            }
        </style>
    </head>
<body>
    <script src="https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js"></script>

    <script>
        let myinfo = 0;
     vkBridge.send('VKWebAppInit');
    vkBridge.send("VKWebAppGetUserInfo").then(result => {
        myinfo = result;})
    </script> 
    <script src="file:///C:/Users/vasin/Desktop/helloworld/fabric.min%20(1).js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<div class="intro">

    <canvas id="largecanv" ></canvas>
    <canvas id="littlecanv" ></canvas>
</div>
                
</body>
<script>
 window.onload = function() {
 let canvcanv = document.getElementById('largecanv');
 var ctx = canvcanv.getContext('2d');
 littlecanv.width = 300;
 littlecanv.height = 300;
 let lcanv = document.getElementById('littlecanv');
 var gtx = lcanv.getContext('2d', { alpha: false });
 document.getElementById('littlecanv').remove();
 let pix = [];let bool = 0;let color= "red"
 for(let i = 0;i<300;i++){
     
     
     for(let z = 0;z<301;z++){
         let id = (i*300)+z;
         
         if(color == "red"){color="red"}else{color="red"}
         //if(bool == 1){bool = 0; color = "red";}else{bool = 1; color = "blue"}
         
         
         //pix.push({id:id,color:color})
         gtx.fillStyle = color;
         gtx.fillRect(z,i,1,1);
     }
 }
 
 console.log(pix)
 canvcanv.width=window.outerWidth;
 canvcanv.height=window.outerHeight;
 (function() {
       
        context = canvcanv.getContext('2d');
        canvcanv.width = window.innerWidth;
        canvcanv.height = window.innerHeight;
 })();
function placePix(e){
    console.log(e)
  let pixLenght = gSize/300
  let Xx=Math.floor((e.clientX-gameX)/pixLenght)
  let Yy=Math.floor((e.clientY-gameY)/pixLenght)
  let  ID = Yy*300+Xx;
  console.log(ID)
  gtx.fillStyle = "rgb("+randomInteger(0, 254)+","+randomInteger(0, 200)+","+randomInteger(0, 200)+")";;
  gtx.fillRect(Xx,Yy,1,1);
  draw(gSize)
}
function draw(size,X){
    if(!X){X = 1;}
    ctx.clearRect(0, 0, canvcanv.width, canvcanv.height);
    ctx.mozImageSmoothingEnabled = false;ctx.webkitImageSmoothingEnabled = false;ctx.msImageSmoothingEnabled = false;ctx.imageSmoothingEnabled = false;gtx.mozImageSmoothingEnabled = false;gtx.webkitImageSmoothingEnabled = false;gtx.msImageSmoothingEnabled = false;gtx.imageSmoothingEnabled = false;
 
    ctx.drawImage(lcanv, gameX*X, gameY*X, size, size);
    //ctx.fillRect(gameX,gameY,size,size);
}
function randomInteger(min, max) {

  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// "add" rectangle onto canvas

let gSize = 500,gameX=window.innerWidth/2,gameY=window.innerHeight/2,lastX=0,lastY=0;
let canvasDr = false,candraw = true;
draw(gSize)
canvcanv.addEventListener('mousedown', function (event) {
    canvasDr = true;

}, false);
canvcanv.addEventListener('mousemove', function (event) {
    if(canvasDr){
       candraw = false;
       gameX += event.clientX - lastX
       gameY += event.clientY - lastY
       
       draw(gSize)
    }
    lastX = event.clientX
    lastY = event.clientY

}, false);
canvcanv.addEventListener('mouseup', function (e) {
    if (candraw){placePix(e)}
    canvasDr = false;
    candraw = true;
}, false);

function addOnWheel(elem, handler) {if (elem.addEventListener) {if ('onwheel' in document) {elem.addEventListener("wheel", handler);} else if ('onmousewheel' in document) {elem.addEventListener("mousewheel", handler);} else {elem.addEventListener("MozMousePixelScroll", handler);}}else{text.attachEvent("onmousewheel", handler);}}
let zoomP = 70;
addOnWheel(canvcanv, function(e) {
    
    if(e.deltaY<0 && zoomP<1315){//zoom
        zoomP = zoomP + 70;
        let xxx = Math.trunc(((gameX-lastX)*-1)/(gSize/zoomP)*1000)/1000
        let yyy = Math.trunc(((gameY-lastY)*-1)/(gSize/zoomP)*1000)/1000
        gSize = gSize+zoomP;
        gameX = gameX-xxx;
        gameY = gameY-yyy;
        draw(gSize)
        
        
    }else
    if( e.deltaY>0 && gSize > 505){ //back
           
        
        let xxx = Math.trunc(((gameX-lastX)*-1)/(gSize/zoomP)*1000)/1000
        let yyy = Math.trunc(((gameY-lastY)*-1)/(gSize/zoomP)*1000)/1000
        gSize = gSize-zoomP;
        gameX = gameX+xxx;
        gameY = gameY+yyy;
        draw(gSize)
        if(zoomP<140){}else{ zoomP = zoomP - 70;}  
    }
    
    e.preventDefault();
});   
///////////////////////////////////////////////////phone
let log = document.getElementById('log')
let lastRazn = 0;
var movecount=0;
        canvcanv.addEventListener("touchstart", function (event) {
            canvasDr = true;
            lastX = event.touches[0].clientX
            lastY = event.touches[0].clientY
            event.preventDefault();
            lastRazn = 0;
            //
            console.log(event)
            //
           
        }, false); 

        canvcanv.addEventListener("touchmove", function (event) {
            if(movecount>1){
                let allTouches = event.touches.length;
                if(canvasDr && allTouches == 1){
                    candraw = false;
                    gameX += event.touches[0].clientX - lastX
                    gameY += event.touches[0].clientY - lastY
                    console.log("X: "+gameX+" Y: "+gameY)
                    draw(gSize)
                } else 
                if (allTouches == 2){
                    candraw = false;

                    phoneZoom(event.touches[0],event.touches[1])
                }
                
                lastX = event.touches[0].clientX
                lastY = event.touches[0].clientY
            }else{movecount = movecount + 1;}
            event.preventDefault();
        }, false,{passive: false});
        canvcanv.addEventListener("touchend", function (event) {
            movecount = 0;
            canvasDr = false;
            if (candraw){placePix(event.changedTouches[0])}
            if (event.touches.length == 0){candraw = true;}
            console.log(event)
            
            event.preventDefault();
        }, false);

        let phoneZoomFix = 1;
        function phoneZoom(one,two){
            zoomP = 7;
            var dist = Math.hypot(
                one.pageX - two.pageX,
                one.pageY - two.pageY);
            let x1, x2;
            if(one.pageX > two.pageX){
                 x1 =  two.pageX;
                 x2 =  one.pageX;
            }else{
                 x1 =  one.pageX;
                 x2 =  two.pageX;
            }
           
            let y1, y2;
            if(one.pageY > two.pageY){
                 y1 =  two.pageY;
                 y2 =  one.pageY;
            }else{
                 y1 =  one.pageY;
                 y2 =  two.pageY;
            }
            
            let touchCenterX = ((x2-x1)/2)+x1
            let touchCenterY = ((y2-y1)/2)+y1

          
            
           
            if(lastRazn == 0){
                lastRazn = dist;
            }else{
                let raznrazn = lastRazn - dist;
                let strPress = Math.trunc(raznrazn*100)/100
                if(strPress<0){strPress=strPress*-1};

                
                ///
                var FZP = zoomP; 
                var FZP1 = zoomP; 
                var FGS1 = gSize + (FZP + 7*strPress)
                if(FZP1>1){FZP1 = FZP1 + 7*strPress;}
                var FGS2 = gSize - FZP1;
                ///
                    if(raznrazn<0&& FGS1<10000&&strPress>0.1){
                        //if(phoneZoomFix < 10){phoneZoomFix=phoneZoomFix+1;}
                        zoomP = zoomP + 7*strPress;
                        let xxx = Math.trunc((((gameX-touchCenterX)*-1)/(gSize/(zoomP)))*100)/100
                        let yyy = Math.trunc((((gameY-touchCenterY)*-1)/(gSize/(zoomP)))*100)/100         //zoom
                        gSize = gSize+(zoomP);
                        gameX = gameX-xxx;
                        gameY = gameY-yyy;
                        
                        
                            draw(gSize)
                        
                        
                    }else
                    if(raznrazn>1&&FGS2>250&&strPress>0.1){  
                        if(zoomP>1){zoomP = zoomP + 7*strPress;}
                        let xxx = Math.trunc((((gameX-touchCenterX)*-1)/(gSize/(zoomP)))*100)/100
                        let yyy = Math.trunc((((gameY-touchCenterY)*-1)/(gSize/(zoomP)))*100)/100           //back
                        gSize = gSize-(zoomP);
                        gameX = gameX+xxx;
                        gameY = gameY+yyy;
                        
                            draw(gSize)
                        
                        //if(phoneZoomFix > 1){phoneZoomFix=phoneZoomFix-0.1;}
                        
                    }
                



                lastRazn = dist;
            }
        }


    }
//////////////////////////////////////////////////////


// document.getElementsByClassName('canvas-container')[0].style.top= "-8px";
// document.getElementsByClassName('canvas-container')[0].style.left= "-8px";
</script>
</html
