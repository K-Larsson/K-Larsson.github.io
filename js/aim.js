var scoreInt = 0,
    gridSize = 10,
    playing = false,
    targets = [],
    timerText = document.getElementById('timer'),
    scoreText = document.getElementById('score'),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasCoords = [canvas.offsetLeft, canvas.offsetTop];

Initiate();

canvas.addEventListener('click', function(ev) {
    var x = ev.pageX - canvasCoords[0],
        y = ev.pageY - canvasCoords[1];
    targets.forEach(function(target) {
        if (x > target.x && x < target.x + 11 && y > target.y && y < target.y + 11) {
            if (playing == false) {
                playing = true;
                StartTimer();
            }
            scoreInt++;
            score.innerHTML = "Score: " + scoreInt;
            GenerateTarget();
        }
    });
});

function Initiate() {
    scoreInt = 0;
    playing = false;
    canvas.style.border = "1px solid black";
    canvas.style.background = "#ffffff";
    if (targets.length > 0) {
        targets.pop();
    }
    targets.push({
        x: 250,
        y: 250
    });
    Draw(true);
};

function GenerateTarget() {
    canvas.style.border = "1px solid white";
    canvas.style.background = "#000000";
    if (targets.length > 0) {
        targets.pop();
    }
    targets.push({
        x: Math.floor(Math.random() * 490),
        y: Math.floor(Math.random() * 490)
    });
    Draw(false);
}

function Draw(initiated) {
    targets.forEach(function(target) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (initiated) {
            context.fillStyle = '#000000';
        } else if (!initiated) {
            context.fillStyle = '#ffffff';
        }
        context.fillRect(1+target.x, 1+target.y, gridSize-1, gridSize-1);
    });
};

function StartTimer() {
    var seconds = 10;
    var timer = setInterval(function () {
        timerText.innerHTML = "Timer: " + seconds;
        if (seconds == 0) {
            clearInterval(timer);
            Initiate();
        }
        seconds--;
    }, 1000);
};