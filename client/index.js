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
                const icon = insertMenuInOuterDivAndGetIcon(member);
                const name = user.username;
                listName.addEventListener('click', function () {
                    setStorItems('message_user_id', user.id);
                    setStorItems('message_user_name', user.username);
                    location.href = "messages/messages.html";
                });
                explanations('icon');
                icon.addEventListener('click', function () {
                    const dropdown = createDiv('dropdown', 'dropdown-menu');
                    const deleteUser = createDiv('delete_user', 'dropdown');
                    const editUser = createDiv('edit_user', 'dropdown');
                    dropdown.appendChild(editUser);
                    dropdown.appendChild(deleteUser);
                    member.appendChild(dropdown);
                    setLanguage();
                    deleteUser.addEventListener('click', function () {
                        if (confirm('Are you sure that you want delete user ' + name + ' ?')) {
                            myHttp.sendHttp('users/' + user.id, 'DELETE');
                            window.location.reload();
                        }
                    });
                    
                    editUser.addEventListener('click', function () {
                        setStorItems('edit-user-id', user.id);
                        setStorItems('edit-user-username', user.username);
                        setStorItems('edit-user-email', user.email);
                        setStorItems('edit-user-password', user.password);
                        setStorItems('edit-user-phone', user.phone);
                        location.href = "add-user/add-user.html";
                    });
                });
            });
        }
    }
    


}


window.addEventListener("dblclick", () => {
    const $phone = document.querySelector(".phone")
    $phone.classList.toggle('-loooooong')
})