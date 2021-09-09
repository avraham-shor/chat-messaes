const myHttp = new MyHttp();
fillValue();

function onSubmit(e) {
    const username = byId('username').value;
    const email = byId('email').value;
    const password = byId('password').value;
    const phone = byId('phone').value;
    const image = byId('image');
    const file = byId('profile').files[0];

    
    if (!isAllValues(username, email, password, phone, file)) {
        printError('register-form', MISSING_VALUES);
        return;
    }
    
    
    
    
    const register = new Register(username, email, password, phone);
    console.log(register);
    
    let method = 'POST';
    let endPoint = 'users/';
    if (getStorItems('edit-user-id')) {
        register.id = getStorItems('edit-user-id');
        method = 'PUT';
        endPoint += register.id;
        
    };
    jsonRegister = JSON.stringify(register);
    localStorage.removeItem('edit-user-id');
    
    myHttp.sendHttp(endPoint, method, jsonRegister);
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4) {
            console.log("myHttp.Http.status", myHttp.Http.status);
            if (myHttp.Http.status == 201 || myHttp.Http.status == 200) {
                console.log(myHttp.Http.responseText);
                let user = new Register();
                user = JSON.parse(myHttp.Http.responseText);
                setStorItems('userId', user.id);
                setStorItems('userName', user.username);
                const data = new FormData();
                data.append('file', file);
                myHttp.sendHttpFile(user.id, 'PUT', data);
                myHttp.Http.onreadystatechange = function () {
                    console.log(myHttp.Http.responseText);
                    image.src = '/profiles/' + user.id + '.jpg';
                }
                byId('submit').style.display = 'none';
                byId('next').style.display = 'inline-block';
                // location.href = "../index.html"
            }
        }
        else {
            printError('email-box', EMAIL_EXISTS);
        }
    }

}

function fillValue() { 
    byId('username').value = getStorItems('edit-user-username');
    byId('email').value = getStorItems('edit-user-email');
    byId('password').value = getStorItems('edit-user-password');
    byId('phone').value = getStorItems('edit-user-phone');
    localStorage.removeItem('edit-user-username');
    localStorage.removeItem('edit-user-email');
    localStorage.removeItem('edit-user-password');
    localStorage.removeItem('edit-user-phone');
    if (getStorItems('edit-user-id')) {
        userId = getStorItems('edit-user-id');
        image.src = '/profiles/' + userId + '.jpg'; 
    };
    
}

function isAllValues() {
    console.log(arguments);
    for (const argument of arguments) {
        if (!argument || argument.length === 0) {
            return false;
        }
    }
    return true;
}

function goToHomePage() {
    localStorage.removeItem('edit-user-id');
    location.href = "../index.html"
}