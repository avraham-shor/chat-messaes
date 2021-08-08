class MyHttp {
    Http = new XMLHttpRequest();
    // baseUrl = 'http://localhost:8081/api/users/';
    baseUrl = 'http://localhost:8080/api/users/';

    sendHttp(endPoint, type, body) {
        const url = this.baseUrl + endPoint;
        console.log(url);
        this.Http.open(type, url);
        this.Http.setRequestHeader('Content-Type', 'application/json');
        this.Http.send(body);
    }
}
const myHttp = new MyHttp();

function onSubmit(e) {
    const d = document;
    const email = d.getElementById('email').value;
    const password = d.getElementById('password').value;
    console.log(email, password);
    const loginUser = new LoginUser(email, password);
    jsonLoginUser = JSON.stringify(loginUser);

    myHttp.sendHttp("login", "POST", jsonLoginUser);

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


function LoginUser(email, password) {
    this.email = email;
    this.password = password;
}

function User(phone, email, id, username, password) {
    this.phone = phone;
    this.email = email;
    this.id = id;
    this.username = username;
    this.password = password;
}


//docker run --name some-nginx -v /C:/Users/avraham.shor/IdeaProjects/chatMessages/client/index.html:/usr/share/nginx/html:ro -d nginx



