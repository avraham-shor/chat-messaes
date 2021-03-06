const myHttp = new MyHttp();

getUsers();


function getUsers() {
    explanations('log-out', 'back', 'language');
    localStorage.removeItem('edit-user-id');
    localStorage.removeItem('message_user_id');
    localStorage.removeItem('message_user_name');
    const phone_screen = document.getElementById('phone_screen');
    console.log(USER_ID);
    myHttp.sendHttp('users', "GET");
    myHttp.Http.onreadystatechange = function () {
        if (myHttp.Http.readyState == 4 && myHttp.Http.status == 200) {
            const response = JSON.parse(myHttp.Http.responseText);
            response.forEach(element => {
                let user = new User();
                console.log(element.username);
                user = element;
                if (user.id == USER_ID) {
                    return;
                }
                const member = createDiv('member', 'member');
                const img = document.createElement('img');
                // testImage(img);
                // img.src = '../images/pngwing.com (1).png';
                
                img.src = '/profiles/' + user.id + '.jpg';
                img.className = 'profile';
                // img.onerror = imageNotFound(img);
                
                // img.onerror = '../images/pngwing.com (1).png';
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
                        if (window.location.hostname != "localhost" && user.id != getStorItems('userId')) {
                            alert(NO_PERMISSIONS);
                        }
                        else if (confirm(YOU_SURE_USER + name + ' ?')) {
                            myHttp.sendHttp('users/' + user.id, 'DELETE');
                            window.location.reload();
                        }
                    });
                    
                    editUser.addEventListener('click', function () {
                        if (window.location.hostname != "localhost") {
                            alert(NO_PERMISSIONS);
                        }
                        else {
                            setStorItems('edit-user-id', user.id);
                            setStorItems('edit-user-username', user.username);
                            setStorItems('edit-user-email', user.email);
                            setStorItems('edit-user-password', user.password);
                            setStorItems('edit-user-phone', user.phone);
                            location.href = "add-user/add-user.html";
                        }
                    });
                });
            });
        }
    }
}

function logOut () {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location.href = 'login/login.html';
}

// function imageNotFound(img) {
//     console.log(img);
//     img.src = '../images/pngwing.com (1).png';
//     img.onerror = null; 
// }

// const imgs = document.getElementsByTagName("img");

// setTimeout(function() {
//     for (var i = 0; i < imgs.length; i++) {
//         console.log(imgs[i]);
//         imgs[i].onError = imageNotFound(imgs[i]);
// }
// }, 3000)






// for (var i = 0; i < imgs.length; i++) {
//     console.log(imgs[i]);
//     imgs[i].onError = imageNotFound(imgs[i]);
// }


window.addEventListener("dblclick", () => {
    const $phone = document.querySelector(".phone")
    $phone.classList.toggle('-loooooong')
})