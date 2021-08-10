const LOCAL = true;

const PORT = LOCAL? '8080' : '8081';
const BASE_URL = 'http://localhost:' + PORT + '/api/';
let startTargetPath = '';
if (!window.location.href.includes('index')) {
    startTargetPath = '../'; 
}
const USER_ID = getStorItems('userId');

loginOrRegister = window.location.href.includes('login') || window.location.href.includes('add-user');
if (!loginOrRegister && !getStorItems('userId')) {
    location.href = startTargetPath + 'login/login.html';
}