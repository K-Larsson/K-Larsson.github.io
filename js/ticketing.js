var tmp, i, data, length, searchIndex, elementHeight;
var numberOfCards = 0;
var templates = []
var template = `<div id="" class='card' draggable='true' ondragstart='drag(event)'>
                    <div class='cardText'>
                        <div class='cardName'>
                            <p data-editable class='cardNameText'>Name</p>
                        </div>
                        <div class='cardInfo'>
                            <p data-editable class='cardInfoText'>Some info</p>
                        </div>
                        <div class='cardFeature'>
                            <p data-editable class='cardFeatureText'>#bug</p>
                        </div>
                    </div>
                    <div id="" class='cardEditButton' onclick='cardEdit(this)'>
                        <div class='editBar1'></div>
                        <div class='editBar2'></div>
                        <div class='editBar3'></div>
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
    $("#increaseHeight").click(function() {
        $(function() {
            increaseContainerHeight();
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

function increaseContainerHeight() {
    tmp = document.getElementById("container1");
    elementHeight = tmp.clientHeight + 75;
    tmp.style.height = elementHeight + "px";
    tmp = document.getElementById("container2");
    elementHeight = tmp.clientHeight + 75;
    tmp.style.height = elementHeight + "px";
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

function cardEdit(el) {
    el.classList.toggle("change");
    /*tmp = el.parentElement.children[0].children[0].innerHTML;
    el.parentElement.children[0].children[0].innerHTML = "<input type='text' placeholder=" + tmp.slice(3, tmp.length-4) + " name='cardNameText'>";
    console.log(tmp.slice(3, tmp.length-4));
    console.log(tmp.slice(3));*/
    /*$("body").on("click", "[data-editable]", function() {
    $(".cardEditButton").on("click", function() {
        var $element = $(this).parent().children();
        console.log($element.attr("id"));
        console.log("hlloe");
        var $input = $('<textarea rows="3" cols="30"/>').val($element.text());
        $element.replaceWith($input);
        var save = function(){
            var $p = $('<p data-editable />').text($input.val());
            $input.replaceWith($p);
        };
        $input.one('blur', save).focus();
    });*/
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
        if (ev.target.className != "card" && ev.target.className != "cardNameText" && ev.target.className != "cardInfoText" && ev.target.className != "cardFeatureText" && ev.target.className != "cardEditButton" && ev.target.className != "editBar1" && ev.target.className != "editBar2" && ev.target.className != "editBar3") {
            ev.target.appendChild(document.getElementById(data));
            /*ev.target.innerHTML += document.getElementById(data);*/
        }
    }
    catch(error) {
        /*console.error("Error: " + error.name + " - " + error.message);*/
    }
}