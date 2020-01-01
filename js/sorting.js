//document.getElementById('form').addEventListener('submit', BubbleSort);
var i, j, tmp;
var random = [], drawArray = [3,10,1,7,5,6,4,8,9,2], left = [], right = [];
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var milliseconds = 1000, gridSize = 10, fps = 60, leftIndex = 0, rightIndex = 0;

//http://localhost:63342/projects/sorting.html?_ijt=8umkgorn93iuc3biq9ics7sb7b
//setInterval(function(){Draw(drawArray)}, 1000);

function Draw(array) {
console.log(array);
    //setTimeout(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff';
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array[i]; j++) {
                if (i != array.length - 1) {
                    context.fillRect(1+i*10, canvas.height-10-j*10, gridSize-1, gridSize-1);
                } else {
                    context.fillRect(1+i*10, canvas.height-10-j*10, gridSize-2, gridSize-1);
                }
            }
        }
    //}, 1000 / fps);
}

function BubbleSort(array) {
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < (array.length - i - 1); j++) {
            if (array[j] > array[j+1]) {
                tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
                drawArray = array;
                break;
            }
        }
    }
}

function MergeSort(array) {
    var midpoint = parseInt(array.length / 2);
    var leftArr   = array.slice(0, midpoint);
    var rightArr  = array.slice(midpoint, array.length);
    drawArray = Merge(MergeSort(leftArr), MergeSort(rightArr));
    Draw(drawArray);
}

function Merge(leftArr, rightArr) {
    var sortedArr = [];
    while (leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr[0]);
            leftArr = leftArr.slice(1)
        } else {
            sortedArr.push(rightArr[0]);
            rightArr = rightArr.slice(1)
        }
    }
    while (leftArr.length) {
        sortedArr.push(leftArr.shift());
    }
    while (rightArr.length) {
        sortedArr.push(rightArr.shift());
    }
    Draw(sortedArr);
    //Sleep();
    return sortedArr;
}

function InsertionSort(array) {
    for(var i = 0; i < array.length; i++) {
        tmp = array[i];
        j = i - 1;
        while (j >= 0 && array[j] > tmp) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = tmp;
        Draw(array);
        //Sleep();
    }
}

function ShellSort(array) {
    var gap = array.length / 2;
    while (gap > 0) {
        for (i = gap; i < array.length; i++) {
            j = i;
            temp = array[i];
            while (j >= gap && array[j-gap] > temp) {
                array[j] = array[j - gap];
                j = j - gap;
            }
            array[j] = temp;
        }
        if (gap == 2) {
            gap = 1;
        } else {
            gap = parseInt(gap / 2);
        }
        Draw(array);
        //Sleep();
    }
}

function SelectionSort(array){
    var len = array.length,
        min;
    for (i=0; i < len; i++){
        min = i;
        for (j=i+1; j < len; j++){
            if (array[j] < array[min]){
                min = j;
            }
        }
        if (i != min){
            array[i] = [array[min], array[min] = array[i]][0];
        }
    }
    Draw(array);
}

function RandomNumbers() {
    for (i = 0; i < 50; i++) {
        random[i] = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
    }
    if (document.getElementById('radioBubbleSort').checked) {
        //requestAnimationFrame(function(){BubbleSort(random)});
        BubbleSort(random);
    } else if (document.getElementById('radioMergeSort').checked) {
        requestAnimationFrame(function(){MergeSort(random)});
    } else if (document.getElementById('radioInsertionSort').checked) {
        requestAnimationFrame(function(){InsertionSort(random)});
    } else if (document.getElementById('radioShellSort').checked) {
        requestAnimationFrame(function(){ShellSort(random)});
    } else if (document.getElementById('radioSelectionSort').checked) {
        requestAnimationFrame(function(){SelectionSort(random)});
    }
}

/*function Sleep() {
    var start = new Date().getTime();
    for (var i = 0; i < 1e8; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
    console.log("hello");
}*/