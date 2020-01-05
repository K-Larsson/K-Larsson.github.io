var width, height, numberOfCards;
var template = `<div class='card'>
                    <div class='cardName'>
                        <p class='cardNameText'>Name</p>
                    </div>
                    <div class='cardInfo'>
                        <p class='cardInfoText'>Some info</p>
                    </div>
                    <div class='cardFeature'>
                        <p class='cardFeatureText'>#bug</p>
                    </div>
                </div>`;

$(document).ready(function() {
    $("#createCard").click(function() {
        $("#container").append(template);
    });
});