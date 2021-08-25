// setInterval(function () {
//     checkIfNewMessage();
// }, 3000);

getMessages();
connect();


function getMessages() {
    this.myHttp = new MyHttp();
    const receiverId = getStorItems('message_user_id');
    const name = getStorItems('message_user_name');
    myHttp.sendHttp('messages/ids?senderId=' + USER_ID + '&receiverId=' + receiverId, "GET");
    const username = byId('user_name');
    username.innerText = name;
    const phone = byId('phone_screen_msg');
    const send = byId('send');
    const writerText = byId('writer');
    writerText.value = '';
    phone.innerText = '';
    let editMessage;
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const response = JSON.parse(myHttp.Http.responseText);
            response.forEach(element => {
                let message = new Message();
                message = element;
                let text = document.createTextNode(message.text);
                const time = createDiv('time', 'time');
                time.innerHTML = message.dateTime;
                let msg = createDiv('msg', 'msg');
                msg.dir = 'auto';

                if (message.senderId == receiverId) {
                    msg.className = 'msg msg-received';
                    time.className = 'time time-received';
                }
                else {
                    msg.className = 'msg msg-sent';
                    time.className = 'time time-sent';
                }
                msg.appendChild(text);
                const icon = insertMenuInOuterDivAndGetIcon(msg);
                explanations('icon');
                let dropdown;
                icon.onclick = function () {
                    if (dropdown) {
                        dropdown.innerHTML = '';
                    } else {
                        const m = message.text;
                        dropdown = createDiv('dropdown', 'dropdown-menu');
                        const deleteMsg = createDiv('delete_msg', 'dropdown');
                        const editMsg = createDiv('edit_msg', 'dropdown');

                        dropdown.appendChild(deleteMsg);
                        if (message.senderId == USER_ID) {
                            dropdown.appendChild(editMsg);
                        }
                        msg.appendChild(dropdown);

                        deleteMsg.onclick = function () {
                            if (confirm('Are you sure that you want delete msg ' + m + ' ?')) {
                                myHttp.sendHttp('messages/' + message.id, 'DELETE');
                                getMessages();
                            }
                        };

                        editMsg.onclick = function () {
                            writerText.value = m;
                            editMessage = message;
                        };
                        setLanguage();
                    }
                };
                phone.appendChild(msg);
                phone.appendChild(time);
            });
            phone.scrollTop = 0;
        }
        else {
            let text = document.createTextNode('');
            let msg = document.createElement('div');
            msg.appendChild(text);
            phone.appendChild(msg);
        }
    }

    setEnterButton();

    // icon.onclick = function () {
    //     if (dropdown.classList.contains('hide')) {
    //         dropdown.classList.add('show');
    //         dropdown.classList.remove('hide');
    //     } else {
    //         dropdown.classList.remove('hide');
    //         dropdown.classList.add('show');
    //     }
    // };


    send.onclick = function () {
        sendMessage(writerText.value, USER_ID, receiverId, editMessage);
    }

    explanations('send', 'log-out', 'back', 'language');
};

function sendMessage(text, senderId, receiverId, editMessage) {
    const message = new Message(text, senderId, receiverId, editMessage?.dateTime, editMessage?.date, editMessage?.id);
    const method = editMessage ? 'PUT' : 'POST';
    const msgId = editMessage ? editMessage.id : '';
    console.log(message);
    jsonMsg = JSON.stringify(message);
    myHttp.sendHttp("messages/" + msgId, method, jsonMsg);
    myHttp.Http.onreadystatechange = function () {
        getMessages();
    }
};


function connect() {
    var socket = new SockJS(HOST + '8080/gs-guide-websocket');
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected');
        stompClient.send("/app/hello", {}, JSON.stringify({ 'name': "Avraham" }));
        stompClient.subscribe('/topic/greetings', function (greeting) {
            const body = greeting.body;
            response = JSON.parse(body);
            if (response && response.id == getStorItems('userId')) {
                notificationMessage(response);
                getMessages();
            }
        });
    });
};


function notificationMessage(response) {
    if (!response.id) return;
    let audio = new Audio('../images/ping_ping.mp3');
    audio.play();
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        let action;
        switch (response.method) {
            case 'POST':
                action = SENT
                break;
            case 'DELETE':
                action = DELETED
                break;
            case 'PUT':
                action = EDIT
                break;
            default:
                break;
        }
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification(response.user.username, {
                body: '\n' + action + '\n' + response.text,
                icon: '../images/avraham_shor_profile.jpg',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification(response.user.username, {
                        body: '\n' + action + '\n' + response.text,
                        icon: 'https://bit.ly/2DYqRrh',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

function setEnterButton() {
    let shiftDown = false;
    const sendButton = document.getElementById("send");
    document.onkeypress = function (e) {
        if (e.keyCode == 13) {
            if (document.activeElement.id == "writer" && !shiftDown) {
                e.preventDefault(); // prevent another \n from being entered 
                sendButton.click();
            }
        }
    };
    document.onkeydown = function (e) {
        if (e.keyCode == 16) shiftDown = true;
    };
    document.onkeyup = function (e) {
        if (e.keyCode == 16) shiftDown = false;
    };
}