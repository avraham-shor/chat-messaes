

// this.server = sio.listen(port);


// const connection = (server) => {
//     // Adding socket connection to the server
//     const io = socketIO.listen(server);
   
//     // Handle events
//     io.on("connection", (newSocket) => {
//      socket = newSocket;
//      console.log(newSocket.id);
//     });
//    }

//    const socket = io("http://localhost:8080");
//    socket.headers.add("Access-Control-Allow-Origin", "application/json");
//    socket.on("connection", (newSocket) => {
//     console.log('dcsdcsdbc');
//    })

// const io = socket.io;

// io.on('connection', client => {
//     client.on('event', data => { /* … */ });
//     client.on('disconnect', () => { /* … */ });
//   });
//   server.listen(3000);


// const plant = new Plant();

// createServer(plant)
//     .listen(8080)

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
    const send = byId('send');
    const writerText = byId('writer');
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
                icon.addEventListener('click', function () {
                    const m = message.text;
                    const dropdown = createDiv('dropdown', 'dropdown-menu');
                    const deleteMsg = createDiv('deleteMsg', 'dropdown');
                    const editMsg = createDiv('editMsg', 'dropdown');
                    dropdown.appendChild(deleteMsg);
                    if (message.senderId == USER_ID) {
                        dropdown.appendChild(editMsg);
                    }
                    
                    deleteMsg.innerText = 'Delete message';
                    editMsg.innerText = 'Edit message';
                        msg.appendChild(dropdown);
                        deleteMsg.addEventListener('click', function () {
                            if (confirm('Are you sure that you want delete msg ' + m + ' ?')) {
                                myHttp.sendHttp('messages/' + message.id, 'DELETE');
                                window.location.reload();
                            }
                        });

                        editMsg.addEventListener('click', function () {
                            writerText.value = m;
                            editMessage = message;
                        });
                });
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


    send.addEventListener('click', function () {
        console.log('editMessage', editMessage);
        sendMessage(writerText.value, USER_ID, receiverId, editMessage);
    })
};

function sendMessage(text, senderId, receiverId, editMessage) {
    const message = new Message(text, senderId, receiverId, editMessage?.dateTime, editMessage?.date, editMessage?.id);
    const method = editMessage? 'PUT'  : 'POST';
    const msgId = editMessage? editMessage.id : '';
    console.log(message);
    jsonMsg = JSON.stringify(message);
    myHttp.sendHttp("messages/" + msgId, method, jsonMsg);
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

