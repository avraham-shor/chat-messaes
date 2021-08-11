function printError(locationInHtml, msg) {
    const location = byId(locationInHtml);
    let error;
    if (byId('error')) {
        error = byId('error');
        error.innerText = '';
    }
    else {
        error = document.createElement('div');
        error.id = 'error';
    }

    error.className = 'error';
    error.innerText = 'Error: ' + msg;
    location.appendChild(error);
}

function createDiv(id, className) {
    const div = document.createElement('div');
    div.className = className;
    div.id = id;
    return div;
}