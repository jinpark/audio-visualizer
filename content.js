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
        analyser.getByteTimeDomainData(dataArray);
        port.postMessage({arr: dataArray, bufferLength: analyser.frequencyBinCount});
    };
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        port = chrome.runtime.connect({name: "visualizer"});
        var intv = setInterval(function(){draw()}, 1000 / 30);
        port.onDisconnect.addListener(function(){clearInterval(intv)});
    });


}, 10000 )
