var input, date, expires, name, cookie, cookieArray, decodedCookie, user;

checkCookie("hey");

function setCookie(cookieName, cookieValue, cookieDays) {
    date = new Date();
    date.setTime(date.getTime() + (cookieDays * 24 * 60 * 60 * 1000));
    expires = "expires=" + date.toUTCString();
    print(cookieName + "=" + cookieValue + ";" + expires + ";path=");
    //document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=";
}

function getCookie(cookieName) {
    name = cookieName + "=";
    decodedCookie = decodeURIComponent(document.cookie);
    cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function checkCookie(cookieName) {
    user = getCookie(cookieName);
    if (user != "") {
        alert("Hello " + user);
    }
}