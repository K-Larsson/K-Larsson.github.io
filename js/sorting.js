//document.getElementById('form').addEventListener('submit', BubbleSort);
var i, j, tmp, min;
var random = [], left = [], right = [];
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var milliseconds = 1000, gridSize = 10, fps = 30, leftIndex = 0, rightIndex = 0;

function Draw(array) {
    console.log(array);
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
}

function BubbleSort(array) {
    setInterval(function() {
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
    }, 1000 / fps);
}

function MergeSort(array) {
    var midpoint = parseInt(array.length / 2);
    var leftArr   = array.slice(0, midpoint);
    var rightArr  = array.slice(midpoint, array.length);
    array = Merge(MergeSort(leftArr), MergeSort(rightArr));
    Draw(array);
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
    return sortedArr;
}

function InsertionSort(array) {
    setInterval(function() {
        for(i = 0; i < array.length; i++) {
            tmp = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > tmp) {
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = tmp;
        }
        Draw(array);
    }, 1000);
}

function ShellSort(array) {
    setInterval(function() {
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
        }
        Draw(array);
    }, 1000);
}

function SelectionSort(array){
    setInterval(function() {
        for (i=0; i < array.length; i++){
            min = i;
            for (j=i+1; j < array.length; j++){
                if (array[j] < array[min]){
                    min = j;
                }
            }
            if (i != min){
                array[i] = [array[min], array[min] = array[i]][0];
            }
        }
        Draw(array);
    }, 1000);
}

function RandomNumbers() {
    for (i = 0; i < 50; i++) {
        random[i] = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
    }
    if (document.getElementById('radioBubbleSort').checked) {
        //requestAnimationFrame(function(){BubbleSort(random)});
        BubbleSort(random);
    } else if (document.getElementById('radioMergeSort').checked) {
        MergeSort(random)
    } else if (document.getElementById('radioInsertionSort').checked) {
        InsertionSort(random)
    } else if (document.getElementById('radioShellSort').checked) {
        ShellSort(random)
    } else if (document.getElementById('radioSelectionSort').checked) {
        SelectionSort(random)
    }
}

/*function Sleep() {
    var start = new Date().getTime();
    for (var i = 0; i < 1e8; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}*/