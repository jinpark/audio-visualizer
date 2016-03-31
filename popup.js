canvas = document.getElementById('visualizer');
canvasCtx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var img = new Image();
img.src = 'image/campbells.png';

var WIDTH = 300;
var HEIGHT = 300;
var IMG_X = (cw  - img.width ) * 0.5;
var IMG_Y = (ch - img.height) * 0.5;

var port = chrome.extension.connect();
port.postMessage({action: 'start'});

port.onMessage.addListener(function(msg) {
  var dataArray = msg.data;
  var bufferLength = msg.bufferLength;

  for(var i = 0; i < bufferLength; i++) {
      var data = dataArray[i];
      var v = data / 128.0;
      var y = v * HEIGHT/2;
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.drawImage(img, IMG_X , IMG_Y , data  , y)
  }
});
