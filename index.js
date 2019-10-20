
function Clock() {
    var day = new Date();
    var hours = day.getHours();
    var minutes = day.getMinutes();
    if (minutes < 10) {minutes = "0" + minutes};
    var seconds = day.getSeconds();
    if (seconds < 10) {seconds = "0" + seconds};
    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" + seconds;
    var timeout = setTimeout(Clock, 1000); // IN MILLISECONDS
}
