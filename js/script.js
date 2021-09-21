
// var canvasbird = document.getElementById("bird-can");
// var ctx2 = canvasbird.getContext("2d");
// var imgbird = new Image();
// imgbird.src = "https://kohlin.net/images/bird.png";

// imgbird.addEventListener("load", function(){
//   var frames1 = [0, 24,48,24];
//   var indexbird = 0;
//   var birdX = 0;
//   function fly(){
//     ctx2.clearRect(0, 0, canvasbird.width, canvasbird.height);
//     ctx2.drawImage(imgbird, 0, frames1[indexbird++], 34, 24,  birdX++, 24,34, 24);
//     if (indexbird > 3 ) indexbird = 0;
//     setTimeout(fly, 20)
//   }
//   fly();

// })



window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();

var c = document.getElementById('c');
var ctx = c.getContext('2d');
var cw = c.width = window.innerWidth;
var ch = c.height = window.innerHeight * .7;
var rand = function (a, b) { return ~~((Math.random() * (b - a + 1)) + a); }

updateAll = function (a) {
    var i = a.length;
    while (i--) {
        a[i].update(i);
    }
}

renderAll = function (a) {
    var i = a.length;
    while (i--) {
        a[i].render(i);
    }
}

var stars = [];

Star = function (x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.speed = (speed / 25);
    this.radius = radius;
    this.saturation = (20 + (this.radius) * 5);
    this.lightness = (8 + this.radius * 4);
}

Star.prototype = {
    update: function (i) {
        this.x += this.speed;
        if (this.x - this.radius >= cw) {
            this.x = rand(0, ch - this.radius)
            this.x = -this.radius;
        }
    },
    render: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, (this.radius < 0) ? 0 : this.radius, 0, Math.PI * 2, false);
        var flickerAdd = (rand(0, 140) === 0) ? rand(5, 20) : 0;
        ctx.fillStyle = 'hsl(240, ' + this.saturation + '%, ' + (this.lightness + flickerAdd) + '%)';
        ctx.fill();
    }
}

makeStarfield = function () {
    var base = .75;
    var inc = .3;
    var count = 40;
    var per = 6;
    while (count--) {
        var radius = base + inc;
        var perTime = per;
        while (perTime--) {
            radius += inc;
            stars.push(new Star(rand(0, cw - radius), rand(0, ch - radius), radius, radius * 3));
        }
    }
}

var loop = function () {
    window.requestAnimFrame(loop);
    updateAll(stars);
    ctx.clearRect(0, 0, cw, ch);
    renderAll(stars);
}

$(document).ready(function () {
    

    $(".sun-img").click(function () {
        $(".sun-img").animate({top:"60%"},3000);
        $(".main-sec").animate({backgroundColor: "linear-gradient(#000005, #050520)"},3000)
        $(".sec-main-sec").animate({backgroundColor:"#101020" ,color:"#eef"},3000)
        $(".moring-seen").fadeOut(3000);
        $(".night-seen").fadeIn(3000);
    })

    $("#moon").click(function () {
        $(".moring-seen").fadeIn(3000);
        $(".night-seen").fadeOut(3000);
        $(".sun-img").animate({top:"0%"},3000);
        $(".main-sec").animate({backgroundColor: "#90e0ef"},3000)
        $(".sec-main-sec").animate({backgroundColor:"#caf0f8" ,color:"#000"},3000)
        
    })


    makeStarfield();
    loop();
})

