class MyHttp {
    Http = new XMLHttpRequest();
    // baseUrl = 'http://localhost:8081/api/'; ////docker
    baseUrl = 'http://localhost:8080/api/'; //localhost

    sendHttp(endPoint, type, userId) {
        console.log(userId);
        const url = this.baseUrl + endPoint;
        this.Http.open(type, url);
        this.Http.setRequestHeader('Content-Type', 'application/json');
        this.Http.send();
    }
}



const userId = window.localStorage.getItem('userId');
console.log(userId, isNaN(+userId), 'userId is null or undefined');
if(userId == null || userId == undefined || userId.length < 10) {
    
    location.href = "login/login.html";
}
const myHttp = new MyHttp();


let myResponse;
const profileImageUrl = "../images/pngwing.com (1).png";

getUsers();


function getUsers() {
    const phone_screen = document.getElementById('phone_screen');
    console.log(userId);
    myHttp.sendHttp('users', "GET", userId);
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const response = JSON.parse(myHttp.Http.responseText);
        console.log(response);
            response.forEach(element => {
                let user = new User();
                console.log(element);
                user = element;
                if (user.id == window.localStorage.getItem('userId')) {
                    return;
                }
                const member = document.createElement('div');
                member.className = 'member';
                const img = document.createElement('img');
                img.src = profileImageUrl;
                const listName = document.createElement('div');
                listName.className = 'name-in-list';
                
                const text = document.createTextNode(user.username);
                listName.appendChild(text);
                member.appendChild(img);
                member.appendChild(listName);
                phone_screen.appendChild(member);

                member.addEventListener('click', function () {
                    localStorage.setItem('message_user_id',user.id);
                    localStorage.setItem('message_user_name',user.username);
                    location.href = "messages/messages.html";
                })
            });
        }
        else if (myHttp.Http.status == 401) {
            console.log("status:",myHttp.Http.status);
            window.localStorage.setItem('userId', '');
            location.href = "login/login.html";
        }
    }

}







function User(id, username) {
    this.id = id;
    this.username = username;
}



window.addEventListener("click", () => {
    const $phone = document.querySelector(".phone")
    $phone.classList.toggle('-loooooong')
})