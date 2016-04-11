canvas = document.getElementById('visualizer');
canvasCtx = canvas.getContext("2d");

var WIDTH = 300;
var HEIGHT = 300;

var port = chrome.extension.connect();
port.postMessage({action: 'start'});

port.onMessage.addListener(function(msg) {
  var dataArray = msg.data;
  var bufferLength = msg.bufferLength;

  canvasCtx.fillStyle = 'rgb(242, 242, 242)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.beginPath();

  var sliceWidth = WIDTH * 1.0 / bufferLength;
  var x = 0;

  for(var i = 0; i < bufferLength; i++) {
      var data = dataArray[i];
      var v = data / 128.0;
      var y = v * HEIGHT/2;

      var r = data + 120 ;
      var g = 255 -  data ;
      var b = data / 3;

      canvasCtx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
  }
  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
});
