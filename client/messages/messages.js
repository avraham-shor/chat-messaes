class MyHttp {
    Http = new XMLHttpRequest();
    baseUrl = 'http://localhost:8081/api/messages';

    sendHttp(endPoint, type, body) {
        const url = this.baseUrl + endPoint;
        this.Http.open(type, url);
        this.Http.setRequestHeader('Content-Type', 'application/json');
        this.Http.send(body);
    }
}
const userId = getStorItems('userId');
console.log(userId);
if (!userId || userId.length < 10) {
    location.href = "login/login.html";
}


getMessages();

setInterval(function () {
    checkIfNewMessage();
}, 3000);

function getMessages() {
    this.myHttp = new MyHttp();
    const receiverId = getStorItems('message_user_id');
    const name = getStorItems('message_user_name');
    myHttp.sendHttp('/' + userId + '/' + receiverId, "GET");
    const username = dId('user_name');
    username.innerText = name;
    const phone = dId('phone_screen_msg');
    phone.innerText = '';
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const response = JSON.parse(myHttp.Http.responseText);
            response.forEach(element => {
                let message = new Message();
                message = element;
                let text = document.createTextNode(message.text);
                const time = document.createElement('div');
                time.innerHTML = message.dateTime;
                let msg = document.createElement('div');

                if (message.senderId == receiverId) {
                    msg.className = 'msg msg-received';
                    time.className = 'time time-received';
                }
                else {
                    msg.className = 'msg msg-sent';
                    time.className = 'time time-sent';
                }

                msg.appendChild(text);
                phone.appendChild(msg);
                phone.appendChild(time);
            });

        }
        else {
            let text = document.createTextNode('');
            let msg = document.createElement('div');
            msg.appendChild(text);
            phone.appendChild(msg);
        }
    }


    const send = dId('send');
    const writerText = dId('writer');
    send.addEventListener('click', function () {
        sendMessage(writerText.value, userId, receiverId);
    })
};

function sendMessage(text, senderId, receiverId) {
    const message = new Message(text, senderId, receiverId);
    console.log(message);
    jsonMsg = JSON.stringify(message);
    myHttp.sendHttp("", "POST", jsonMsg);
    myHttp.Http.onreadystatechange = function () {
        console.log(myHttp.Http.responseText);
        window.location.reload();
    }

}

function checkIfNewMessage() {
    this.myHttp = new MyHttp();
    const anotherId = getStorItems('message_user_id');
    myHttp.sendHttp(`/count/${anotherId}/${userId}`, "GET");
    myHttp.Http.onreadystatechange = function () {
        console.log(myHttp.Http.responseText);
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const count = JSON.parse(myHttp.Http.responseText);
            oldCount = getStorItems(`messages_user_${anotherId}_count`);
            console.log('count', count, 'oldCount', oldCount);
            if (oldCount && count > oldCount) {
                // let audio = dId('audio');
                // audio.play();
                getMessages();
            }
            window.localStorage.setItem(`messages_user_${anotherId}_count`, count);

        }

    }
}

function getStorItems(param) {
    return localStorage.getItem(param);
}

function dId(param) {
    return document.getElementById(param);
}



class Message {
    constructor(text, senderId, receiverId) {
        this.text = text;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
