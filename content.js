var script = document.createElement('script');
var js = [
"audioTagQ = {};",
"audioTagQNextKey = 0;",
"var wrappedCreateElement = document.createElement;",
"document.createElement = function createElement(name) {",
"    var res = wrappedCreateElement.call(this, name);",
"    if (name === 'audio') {",
"        console.log(res);",
"        res.crossOrigin = 'anonymous';",
"        document.body.appendChild(res);",
"        audioTagQ[audioTagQNextKey++] = {elem: res, checked: 0};",
"        if (res.id == 'html5AudioObject_Single'){ console.log(['here!', res]) }",
"    }",
"    return res;",
"};"
];
script.text = js.join("\n");
script.dataset.origin = 'soundcloudrepeat';
document.documentElement.appendChild(script);

setTimeout(function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createMediaElementSource(document.querySelectorAll('audio')[1]);
    console.log(document.querySelectorAll('audio')[1]);
    console.log(source);
    var analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    var WIDTH = 300;
    var HEIGHT = 150;

    function draw() {
        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {
           
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
    };

    chrome.runtime.sendMessage({canvas: true}, function(response) {
        console.log('look here');
        console.log(response);
        canvas = document.createElement('canvas');
        i = document.getElementsByClassName('l-listen-hero')[0];
        i.appendChild(canvas);
        canvasCtx = canvas.getContext("2d")
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      // console.log(response.farewell);
      draw();

    });


}, 10000 )
