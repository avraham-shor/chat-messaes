const myHttp = new MyHttp();
fillValue();

function onSubmit(e) {
    const username = byId('username').value;
    const email = byId('email').value;
    const password = byId('password').value;
    const phone = byId('phone').value;
    console.log(username, email, password, phone);

    const register = new Register(username, email, password, phone);
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
            if (myHttp.Http.status == 201) {
                console.log(myHttp.Http.responseText);
                let user = new Register();
                user = JSON.parse(myHttp.Http.responseText);
                getStorItems('userId', user.id);
                getStorItems('userName', user.username);
                location.href = "../index.html"
            }
        }
        else {
            printError('email-box', 'the email is exists in the system!');
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
}