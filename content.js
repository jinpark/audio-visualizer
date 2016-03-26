
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// chrome.tabCapture.capture({
//             audio : true,
//             video : false
//         }, function(stream) {
//             console.log('stream', stream);
//             var source = audioCtx.createMediaElementSource(stream);
//             console.log(source);
//             var analyser = audioCtx.createAnalyser();
//             source.connect(analyser);
//             analyser.connect(audioCtx.destination);

//             analyser.fftSize = 2048;
//             var bufferLength = analyser.frequencyBinCount;
//             var dataArray = new Uint8Array(bufferLength);

//             analyser.getByteTimeDomainData(dataArray);

//             var WIDTH = 300;
//             var HEIGHT = 150;

//             function draw() {
//                 analyser.getByteTimeDomainData(dataArray);
//                 port.postMessage({arr: dataArray, bufferLength: analyser.frequencyBinCount});
//             };
//             chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//                 port = chrome.runtime.connect({name: "visualizer"});
//                 var intv = setInterval(function(){draw()}, 1000 / 30);
//                 port.onDisconnect.addListener(function(){clearInterval(intv)});
//             });

//         });
