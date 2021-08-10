const myHttp = new MyHttp();

getUsers();


function getUsers() {
    const phone_screen = document.getElementById('phone_screen');
    console.log(USER_ID);
    myHttp.sendHttp('users', "GET");
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const response = JSON.parse(myHttp.Http.responseText);
        console.log(response);
            response.forEach(element => {
                let user = new User();
                console.log(element);
                user = element;
                if (user.id == USER_ID) {
                    return;
                }
                const member = document.createElement('div');
                member.className = 'member';
                const img = document.createElement('img');
                img.src = '../images/pngwing.com (1).png';
                const listName = document.createElement('div');
                listName.className = 'name-in-list';
                
                const text = document.createTextNode(user.username);
                listName.appendChild(text);
                member.appendChild(img);
                member.appendChild(listName);
                phone_screen.appendChild(member);

                member.addEventListener('click', function () {
                    setStorItems('message_user_id',user.id);
                    setStorItems('message_user_name',user.username);
                    location.href = "messages/messages.html";
                })
            });
        }
    }

}


window.addEventListener("click", () => {
    const $phone = document.querySelector(".phone")
    $phone.classList.toggle('-loooooong')
})