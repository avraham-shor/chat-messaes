
const myHttp = new MyHttp();

function onSubmit(e) {
    const email = byId('email').value;
    const password = byId('password').value;
    console.log(email, password);
    const loginUser = new LoginUser(email, password);
    jsonLoginUser = JSON.stringify(loginUser);
    myHttp.sendHttp("users/login", "POST", jsonLoginUser);
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            let user = new User();
            user = JSON.parse(myHttp.Http.responseText);
            console.log(user.id);
            console.log(user.username);
            setStorItems('userId', user.id);
            setStorItems('userName', user.username);
            location.href = "../index.html";
        }
        else {
            printError('pass', 'One or more parameters are incorrect!');
        }
    }
}
