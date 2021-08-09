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

    myHttp.sendHttp('users', 'POST', jsonRegister);
    if (myHttp.Http.readyState == 4) {
        if (myHttp.Http.status == 200) {
            myHttp.Http.onreadystatechange = function () {
                console.log(myHttp.Http.responseText);
                setTimeout(function () {
                    location.href = "../index.html"
                }, 3000);
            }
        }
        else {
            console.log('myHttp.Http.status', myHttp.Http.status);
        }


    }
}