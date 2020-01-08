var tmp, i, data, length, searchIndex;
var numberOfCards = 0;
var templates = []
var template = `<div id="" class='card' draggable='true' ondragstart='drag(event)'>
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
                    <div id="" class='editButton' onclick='menu(this)'>
                        <div class='bar1'></div>
                        <div class='bar2'></div>
                        <div class='bar3'></div>
                    </div>
                </div>`;

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

$(document).ready(function() {
    $("#createCard").click(function() {
        $(function() {
            generateTemplate();
            $("#container1").append(templates.last());
            /*$("#container1").append(templates[templates.length - 1]);*/
        });
    });
});

function generateTemplate() {
    searchIndex = nthIndex(template, '"', 1) + 1;
    tmp = template.substring(0, searchIndex);
    tmp += "card" + numberOfCards;
    searchIndex = nthIndex(template, '"', 3) + 1;
    tmp += template.substring(0, searchIndex);
    tmp += "editCard" + numberOfCards;
    tmp += template.substring(searchIndex);
    templates[numberOfCards] = tmp;
    numberOfCards++;
}

function nthIndex(str, query, n) {
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

function menu(el) {
    el.classList.toggle("change");
    /*tmp = el.parentElement.children[0].children[0].innerHTML;
    el.parentElement.children[0].children[0].innerHTML = "<input type='text' placeholder=" + tmp.slice(3, tmp.length-4) + " name='cardNameText'>";
    console.log(tmp.slice(3, tmp.length-4));
    console.log(tmp.slice(3));*/
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    data = ev.dataTransfer.getData("text/plain");
    try {
        ev.target.appendChild(document.getElementById(data));
        /*ev.target.innerHTML += document.getElementById(data);*/
    }
    catch(error) {
        /*console.error("Error: " + error.name + " - " + error.message);*/
    }
}