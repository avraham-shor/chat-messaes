
const myHttp = new MyHttp();

function onSubmit(e) {
    const d = document;
    const email = d.getElementById('email').value;
    const password = d.getElementById('password').value;
    console.log(email, password);
    const loginUser = new LoginUser(email, password);
    jsonLoginUser = JSON.stringify(loginUser);

    myHttp.sendHttp("users/login", "POST", jsonLoginUser);

    if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200 || true) {
        myHttp.Http.onreadystatechange = function () {
            let user = new User();
            user = JSON.parse(myHttp.Http.responseText);
            console.log(user.id);
            console.log(user.username);  

            window.localStorage.setItem('userId', user.id);
            window.localStorage.setItem('userName', user.username);
            setTimeout(function (){
                location.href = "../index.html";
            }, 3000);
            
        }
    }
    // else {
    //     console.log("LOGIN FAILED!");
    // }
}

