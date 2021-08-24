const LOCAL = true;

const PORT = LOCAL ? '8080' : '8081';
const HOST = window.location.host.slice(0, -2);
const BASE_URL =  'http://' + HOST + PORT + '/api/';
let startTargetPath = '';
if (!window.location.href.includes('index')) {
    startTargetPath = '../';
}
const USER_ID = getStorItems('userId');

loginOrRegister = window.location.href.includes('login') || window.location.href.includes('add-user');
if (!loginOrRegister && !getStorItems('userId')) {
    location.href = startTargetPath + 'login/login.html';
}
const isHebrew = true;


const SENT = !isHebrew ? 'send to you a message:' : 'שלך לך הודעה:';
const DELETED = !isHebrew ? ' deleted the message:' : 'מחק את ההודעה:';
const EDIT = !isHebrew ? ' edit the message:' : 'ערך את ההודעה:';


setLanguage();
function setLanguage() {
    const labels = [
        {id: 'email_label' , header: ['Type your User Email', 'הכנס את כתובת המייל שלך']},
        {id: 'password_label' , header: ['Type your Password', 'הכנס את הקוד הסודי']},
        {id: 'r_name_label' , header: ['Type your User Name', 'הכנס את השם שלך']},
        {id: 'r_phone_label' , header: ['Type your Phone Number', 'הכנס את מספר הסלולרי שלך']},
        {id: 'login' , header: ['Login', 'התחברות']},
        {id: 'register' , header: ['Register', 'הרשמה']},
        {id: 'submit' , header: ['Submit', 'אישור']},
        {id: 'delete_user' , header: ['Delete user', 'מחק משתמש']},
        {id: 'edit_user' , header: ['Edit user', 'ערוך משתמש']}, 
        {id: 'delete_msg' , header: ['Delete message', 'מחק הודעה']},
        {id: 'edit_msg' , header: ['Edit message', 'ערוך הודעה']}, 
        {id: 'send-description' , header: ['Send', 'שליחה']},
        {id: 'log-out-description' , header: ['Log Out', 'התנתק']},
        {id: 'back-description' , header: ['back', 'חזור']},
        {id: 'icon-description' , header: ['menu', 'תפריט']},
        // {id: '' , header: ['', '']},
        // {id: '' , header: ['', '']},
        // {id: '' , header: ['', '']},
        
    ];

 for (const element of labels) {
    if (byId(element.id)){
        byId(element.id).innerText = isHebrew? element.header[1] : element.header[0];
    }
  }


}