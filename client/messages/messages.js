getMessages();

setInterval(function () {
    checkIfNewMessage();
}, 3000);

function getMessages() {
    this.myHttp = new MyHttp();
    const receiverId = getStorItems('message_user_id');
    const name = getStorItems('message_user_name');
    myHttp.sendHttp('messages/' + USER_ID + '/' + receiverId, "GET");
    const username = byId('user_name');
    username.innerText = name;
    const phone = byId('phone_screen_msg');
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


    const send = byId('send');
    const writerText = byId('writer');
    send.addEventListener('click', function () {
        sendMessage(writerText.value, USER_ID, receiverId);
    })
};

function sendMessage(text, senderId, receiverId) {
    const message = new Message(text, senderId, receiverId);
    console.log(message);
    jsonMsg = JSON.stringify(message);
    myHttp.sendHttp("messages/", "POST", jsonMsg);
    myHttp.Http.onreadystatechange = function () {
        console.log(myHttp.Http.responseText);
        window.location.reload();
    }

}

function checkIfNewMessage() {
    this.myHttp = new MyHttp();
    const anotherId = getStorItems('message_user_id');
    myHttp.sendHttp(`messages/count/${anotherId}/${USER_ID}`, "GET");
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const count = JSON.parse(myHttp.Http.responseText);
            oldCount = getStorItems(`messages_user_${anotherId}_count`);
            console.log('count', count, 'oldCount', oldCount);
            if (oldCount && count > oldCount) {
                // let audio = byId('audio');
                // audio.play();
                window.location.reload();
            }
            window.localStorage.setItem(`messages_user_${anotherId}_count`, count);

        }

    }
}

