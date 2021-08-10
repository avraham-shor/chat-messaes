const myHttp = new MyHttp();

function onSubmit(e) {
    const d = document;
    const username = d.getElementById('username').value;
    const email = d.getElementById('email').value;
    const password = d.getElementById('password').value;
    const phone = d.getElementById('phone').value;
    console.log(username, email, password, phone);
    const register = new Register(username, email, password, phone);
    jsonRegister = JSON.stringify(register);

    myHttp.sendHttp('users/', 'POST', jsonRegister);
    myHttp.Http.onreadystatechange = function () {
    if (myHttp.Http.readyState == 4) {
        if (myHttp.Http.status == 201) {
                console.log(myHttp.Http.responseText);
                setTimeout(function () {
                    let user = new Register();
                    user = JSON.parse(myHttp.Http.responseText);
                    window.localStorage.setItem('userId', user.id);
                    window.localStorage.setItem('userName', user.username);
                    location.href = "../index.html"
                }, 3000);
            }
        }
        else {
            printError('email-box', 'the email is exists in the system!');
        }


    }
}