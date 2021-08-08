class MyHttp {
    Http = new XMLHttpRequest();
    // baseUrl = 'http://localhost:8081/api/';
    baseUrl = 'http://localhost:8080/api/';

    sendHttp(endPoint, type, body) {
        const url = this.baseUrl + endPoint;
        this.Http.open(type, url);
        this.Http.setRequestHeader('Content-Type', 'application/json');
        this.Http.send(body);
    }
}

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
    myHttp.Http.onreadystatechange = function () {
        console.log(myHttp.Http.responseText);
        setTimeout(function (){
            location.href = "../index.html";
        }, 3000);
        
    }
}


function Register(username, email, password, phone) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
}