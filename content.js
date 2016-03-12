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
    var gainNode = audioCtx.createGain();
    var CurY;
    var HEIGHT = window.innerHeight;
    document.onmousemove = updatePage;

    function updatePage(e) {
        CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        gainNode.gain.value = CurY/HEIGHT;
    }
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}, 5000 )
