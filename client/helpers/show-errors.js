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

function insertMenuInOuterDivAndGetIcon(outerDiv) { 
    let icon = createDiv('icon', 'icon-menu');
                let div1 = createDiv();
                let div2 = createDiv();
                let div3 = createDiv();
                icon.appendChild(div1);
                icon.appendChild(div2);
                icon.appendChild(div3);
                outerDiv.appendChild(icon);
                outerDiv.addEventListener('mouseover', function() {
                    icon.className = 'icon-menu show';
                });
                outerDiv.addEventListener('mouseleave', function() {
                    icon.className = 'icon-menu hide';
                });
            return icon;
}

function explanations() {
    for (const id of arguments) {
        const htmlElement = byId(id);
        if (!htmlElement) return;
        const description = createDiv(id + '-description', 'description');
        htmlElement.addEventListener('mouseover', function (){
        description.className = 'description show';
        htmlElement.appendChild(description);
        setLanguage();
    });

    htmlElement.addEventListener('mouseleave', function (){
        description.className = 'description hide';
    });
    };
    
    
}