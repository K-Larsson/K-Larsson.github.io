var tmp, i, ii, data, length, searchIndex1, searchIndex2, elementHeight, dragging;
var numberOfCards = 0;
var mousePos = [], templates = [], classes = [];
/*var template = `<div id="" class='card' draggable='true' ondragstart='Drag(event)' ondragover='Hover(this)' onmousemove='GetMousePosition(event)'>*/
var template = `<div id="" class='card' draggable='true' ondragstart='Drag(event)' onmousemove='GetMousePosition(event)'>
                    <div class='topHover'></div>
                    <div class='cardTextContainer'>
                        <div class='cardText'>
                            <div class='cardName'>
                                <p class='cardNameText'>Name</p>
                            </div>
                            <div class='cardInfo'>
                                <p class='cardInfoText'>Some info</p>
                            </div>
                            <div class='cardFeature'>
                                <p class='cardFeatureText'>#bug</p>
                            </div>
                        </div>
                        <div id="" class='CardEditButton' onclick='CardEdit(this)'>
                            <div class='editBar1'></div>
                            <div class='editBar2'></div>
                            <div class='editBar3'></div>
                        </div>
                    </div>
                    <div class='bottomHover'></div>
                </div>`;

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

$(document).ready(function() {
    $("#createCard").click(function() {
        $(function() {
            GenerateTemplate();
            $("#container1").append(templates.last());
            /*$("#container1").append(templates[templates.length - 1]);*/
        });
    });
    /*$("#increaseHeight").click(function() {
        $(function() {
            increaseContainerHeight();
        });
    });*/
});

function GenerateTemplate() {
    searchIndex1 = NthIndex(template, '"', 1) + 1;
    tmp = template.substring(0, searchIndex1);
    tmp += "card" + numberOfCards;
    searchIndex2 = NthIndex(template, '"', 3) + 1;
    tmp += template.substring(searchIndex1, searchIndex2);
    tmp += "editCard" + numberOfCards;
    tmp += template.substring(searchIndex2);
    templates[numberOfCards] = tmp;
    numberOfCards++;
}

/* NOT USED ANYMORE
-----------------
function increaseContainerHeight() {
    tmp = document.getElementById("container1");
    elementHeight = tmp.clientHeight + 75;
    tmp.style.height = elementHeight + "px";
    tmp = document.getElementById("container2");
    elementHeight = tmp.clientHeight + 75;
    tmp.style.height = elementHeight + "px";
}*/

function NthIndex(str, query, n) {
    length = str.length;
    i = -1;
    while(n-- && i++ < length){
        i = str.indexOf(query, i);
        if (i < 0) {
            break;
        }
    }
    return i;
}

function CardEdit(el) {
    el.classList.toggle("change");
    classes = el.className.split(" ");
    for (i = 0; i < el.parentElement.children[0].childElementCount; i++) {
        if (classes[1] == "change") {
            tmp = new DOMParser().parseFromString(el.parentElement.children[0].children[i].innerHTML, 'text/html');
            el.parentElement.children[0].children[i].innerHTML = "<textarea rows='2' cols='30' style='align:left'>" + tmp.body.textContent + "</textarea>";
        } else if (classes[1] != "change") {
            tmp = el.parentElement.children[0].children[i].children[0].value;
            el.parentElement.children[0].children[i].innerHTML = '<p class="cardNameText">' + tmp + "</p>";
        }
    }
}

function AllowDrop(ev) {
    ev.preventDefault();
}

function Drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    /*  FOR TESTING */
    tmp = document.getElementById("container");
    for (i = 0; i < tmp.childElementCount; i++) {
        for (ii = 0; ii < tmp.children[i].childElementCount; ii++) {
            length = tmp.children[i].children[ii].id.charAt(tmp.children[i].children[ii].id.length-1)
            tmp.children[i].children[ii].children[1].children[0].children[0].children[0].innerHTML = length + length + length + length + length + length;
            tmp.children[i].children[ii].children[0].style.display = "block";
            tmp.children[i].children[ii].children[0].style.animation = "fadeIn 1s";
            tmp.children[i].children[ii].children[2].style.display = "block";
            tmp.children[i].children[ii].children[2].style.animation = "fadeIn 1s";
        }
    }
}

function Drop(ev) {
    ev.preventDefault();
    data = ev.dataTransfer.getData("text/plain");
    for (i = 0; i < tmp.childElementCount; i++) {
        for (ii = 0; ii < tmp.children[i].childElementCount; ii++) {
            name = tmp.children[i].children[ii].id.charAt(tmp.children[i].children[ii].id.length-1)
            tmp.children[i].children[ii].children[1].children[0].children[0].children[0].innerHTML = name + name + name + name + name + name;
            tmp.children[i].children[ii].children[0].style.animation = "fadeOut 0.5s";
            tmp.children[i].children[ii].children[2].style.animation = "fadeOut 0.5s";
            (function(){    /* IIFE "IFFY" */
                 var j = i;
                 var jj = ii;
                 setTimeout(function() {
                    tmp.children[j].children[jj].children[0].style.display = "none";
                    tmp.children[j].children[jj].children[2].style.display = "none";
                 }, 500);
             })();
        }
    }
    try {
        if (ev.target.id == "container1" || ev.target.id == "container2") {
            ev.target.appendChild(document.getElementById(data));
        } else if (ev.target.className == "topHover") {
            for (i = 0; i < ev.target.parentElement.parentElement.childElementCount; i++) {
                if (ev.target.parentElement.id == ev.target.parentElement.parentElement.childNodes[i].id) {
                    ev.target.parentElement.parentElement.insertBefore(document.getElementById(data), ev.target.parentElement.parentElement.childNodes[i]);
                }
            }
        } else if (ev.target.className == "bottomHover") {
            for (i = 0; i < ev.target.parentElement.parentElement.childElementCount; i++) {
                if (ev.target.parentElement.id == ev.target.parentElement.parentElement.childNodes[i].id) {
                    insertAfter(ev.target.parentElement.parentElement.childNodes[i], document.getElementById(data));
                }
            }
        }
    }
    catch(error) {
        console.error("Error: " + error.name + " - " + error.message);
    }
}

function Hover(el) {
    console.log(mousePos);
    /*  FIGURE OUT HOW TO MAKE ROOM WHEN HOVERING
    var rect = ev.target.parentElement.getBoundingClientRect();
    console.log(mousePos);
    console.log(rect.top);
    console.log(mousePos - rect.top > ev.target.offsetHeight / 2);
    if (mousePos[1] > ev.target.offsetHeight / 2) {
        ev.target.style.backgroundColor = "red";
    }
    /* 358, 68 */
    /* DOC HEIGHT - ELEM HEIGHT > ELEM HEIGHT / 2 */
    if (mousePos[1] > el.width/2) {
        el.style.backgroundColor = "red";
    }
}

function GetMousePosition(ev) {
    mousePos = [ev.clientX, ev.clientY];
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}