chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.action === 'start') {
            var audioCtx = new (window.AudioContext)();
            chrome.tabCapture.capture({
                    audio : true,
                    video : false
                }, function(stream) {
                    var source = audioCtx.createMediaStreamSource(stream);
                    var analyser = audioCtx.createAnalyser();
                    source.connect(analyser);
                    analyser.connect(audioCtx.destination);

                    analyser.fftSize = 1024;
                    var bufferLength = analyser.frequencyBinCount;
                    var dataArray = new Uint8Array(bufferLength);

                    function draw() {
                        analyser.getByteTimeDomainData(dataArray);
                        port.postMessage({data: dataArray, bufferLength: bufferLength});
                    };

                    var intv = setInterval(function(){ draw() }, 1000 / 30);
                    port.onDisconnect.addListener(function(){
                        clearInterval(intv);
                        audioCtx.close();
                        stream.getAudioTracks()[0].stop();
                    });
                }
            );
        }
    });
});
