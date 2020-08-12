
// var newplay = document.getElementById('files');
// var sing = true;
// newplay.onclick = function () {
//     if(sing){
//         context.connect();
//         sing = false;
//     } else {
//         context.close();
//         sing = true;
//     }
// }

var currentTime = document.getElementById('current-time');
var pause = document.getElementById('pause');
var context;

function setCurrentTime(length) {
    var current = new Date(audio.currentTime * 1000);
    var end = new Date(length * 1000)
    var min1 = current.getMinutes();
    var sec1 = current.getSeconds();
    var min2 = end.getMinutes();
    var sec2 = end.getSeconds();
    if (current.getMilliseconds() == end.getMilliseconds())
        pause.innerText = "▶";
    currentTime.innerText =
        `${min1 < 10 ? "0" + min1 : min1}:${sec1 < 10 ? "0" + sec1 : sec1} / ${min2 < 10 ? "0" + min2 : min2}:${sec2 < 10 ? "0" + sec2 : sec2}`;
}

//배경 슬라이드
$(document).ready(function () {
    var img = $("#wrap>.wrap-box");
    var cnt = 0;
    var max = img.length - 1;

    function slide() {
        $(img[cnt]).css({ 'opacity': 0.5 }).siblings('.wrap-box').css({ 'opacity': 0 });
        cnt++;
        if (cnt > max) {
            cnt = 0;
        }
        $(img[cnt]).css({ 'opacity': 1 })
    }
    setInterval(slide, 5000)

})

//음악 재생, 멈추기
pause.onclick = function () {
    if (pause.innerText == "ll") {
        pause.innerText = "▶";
        //일시정지
        audio.pause();
    } else {
        pause.innerText = "ll";
        //재생
        audio.play();
    }
}


var file = document.getElementById("files");
var audio = document.getElementById("audio");
var src;

file.onchange = function () {
    context = new AudioContext();
    var file = this.files[0];
    var file_name = file.name;
    var file_kind = file_name.lastIndexOf('.');
    var file_type = file_name.substring(file_kind + 1, files.length).toLowerCase();

    var check_file_type = ['etc', 'wav', 'mp3'];

//     if (check_file_type.indexOf(file_type) == -1)
//         alert('오디오 파일만 선택할 수 있습니다.');
    else {
        $(".music-title").text(file_name.split(".").splice(0, file_name.split(".").length - 1).join("."));
        $(".music-title").css({ "font-size": "35px" })
        pause.innerText = "ll";
        audio.src = URL.createObjectURL(file);
        audio.load();
        audio.play();

        var analyser = context.createAnalyser();
        analyser.connect(context.destination);

        src = context.createMediaElementSource(audio);
        src.connect(analyser);

        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight + 1000;
        var ctx = canvas.getContext("2d");
        var canvas2 = document.getElementById("canvas2");
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight + 1000;
        var ctx2 = canvas2.getContext("2d");
        var canvas3 = document.getElementById("canvas3");
        canvas3.width = window.innerWidth;
        canvas3.height = window.innerHeight + 1000;
        var ctx3 = canvas2.getContext("2d");
        var canvas4 = document.getElementById("canvas4");
        canvas4.width = window.innerWidth;
        canvas4.height = window.innerHeight + 1000;
        var ctx4 = canvas2.getContext("2d");


        audio.currentTime = 0;

        setInterval(function () {
            setCurrentTime(audio.duration);
        }, 100);

        analyser.fftSize = 256;

        var bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);

        var dataArray = new Uint8Array(bufferLength);
        console.log(dataArray);
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        var barWidth = (WIDTH / bufferLength )
        var barHeight;
        var x = 0;

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            x = 0;

            analyser.getByteFrequencyData(dataArray);


            //ctx.clearRect(0,0,WIDTH,HEIGHT);
            //ctx2.clearRect(0,0,WIDTH,HEIGHT);
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx2.fillStyle = "rgba(0,0,0,0.1)";
            ctx2.fillRect(0, 0, WIDTH, HEIGHT);
            ctx3.fillStyle = "rgba(0,0,0,.1)";
            ctx3.fillRect(0, 0, WIDTH, HEIGHT);
            ctx4.fillStyle = "rgba(0,0,0,.1)";
            ctx4.fillRect(0,0, WIDTH, HEIGHT);

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 4 ;

                var r = barHeight + (25 * (i / bufferLength));
                var g = 250 * (i / bufferLength);
                var b = 50;
               // console.log(r,g,b);
                var a = 0.3;

                ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                ctx2.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                ctx2.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                ctx3.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                ctx3.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                ctx4.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                ctx4.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        }

        renderFrame();
    }
};


// 음악 플레이 기능
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var context = new window.AudioContext();
// var source;
// function playSound(arraybuffer) {
//     context.decodeAudioData(arraybuffer, function (buf) {
//         source = context.createBufferSource();
//         source.connect(context.destination);
//         source.buffer = buf;
//         source.start(0);
//     });
// }

// function playFile(file) {
//     var freader = new FileReader();

//     freader.onload = function (e) {
//         console.log(e.target.result);
//         playSound(e.target.result);
//     };
//     freader.readAsArrayBuffer(file);
// }

// document.getElementsByClassName("music-title").addEventListner('change', handleFileSelect, false);


$("#currenttime").text();

// 이펙트 기능
