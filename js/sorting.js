document.getElementById("form").addEventListener("submit", BubbleSort);
var i, j, tmp, percentage;
var random = [0];
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var grid = 10;
var fps = 60;
var continueLoop = true;

function Draw(array) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff';
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[i]; j++) {
            if (i != array.length - 1) {
                context.fillRect(1+i*10, canvas.height-10-j*10, grid-1, grid-1);
            } else {
                context.fillRect(1+i*10, canvas.height-10-j*10, grid-2, grid-1);
            }
            //continueLoop = false;
            if (i == array.length) {
                if (j == array[i]) {
                    console.log(i);
                    console.log(j);
                    console.log(array[i]);
                    console.log("stopping");
                    continueLoop = false;
                    //cancelAnimationFrame(globalID);
                }
            }
        }
    }
}

function BubbleSort(array) {
    setTimeout(function() {
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < (array.length - i - 1); j++) {
            if (array[j] > array[j+1]) {
                tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
                Draw(array);
            }
        }
    }
    console.log(array);
    console.log(continueLoop);
    if (continueLoop) {
        requestAnimationFrame(BubbleSort(array));
    }
    }, 1000 / fps);
}

function RandomNumbers() {
    for (i = 0; i < 50; i++) {
        random[i] = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    }
    console.log(random);
    requestAnimationFrame(BubbleSort(random));
}