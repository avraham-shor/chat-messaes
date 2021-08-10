const myHttp = new MyHttp();

function onSubmit(e) {
    const username = byId('username').value;
    const email = byId('email').value;
    const password = byId('password').value;
    const phone = byId('phone').value;
    console.log(username, email, password, phone);

    const register = new Register(username, email, password, phone);
    jsonRegister = JSON.stringify(register);

    myHttp.sendHttp('users/', 'POST', jsonRegister);
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