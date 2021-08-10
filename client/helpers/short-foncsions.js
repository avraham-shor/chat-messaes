function getStorItems(param) {
    return localStorage.getItem(param);
}

function setStorItems(key, value) {
    return localStorage.setItem(key, value);
}

function byId(param) {
    return document.getElementById(param);
}