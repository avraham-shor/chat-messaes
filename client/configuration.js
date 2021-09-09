const LOCAL = true;

const PORT = LOCAL ? '8080' : '8081';
const HOST = window.location.hostname;
const BASE_URL =  'http://' + HOST + ':' + PORT + '/api/';
if (localStorage.getItem('isHebrew') == null) {
    setStorItems('isHebrew', true);
}

let isHebrew = getStorItems('isHebrew');
let startTargetPath = '';
if (!window.location.href.includes('index')) {
    startTargetPath = '../';
}
const USER_ID = getStorItems('userId');

loginOrRegister = window.location.href.includes('login') || window.location.href.includes('add-user');
if (!loginOrRegister && !getStorItems('userId')) {
    location.href = startTargetPath + 'login/login.html';
}



const SENT = getStorItems('isHebrew') == 'false' ? 'send to you a message:' : 'שלך לך הודעה:';
const DELETED = getStorItems('isHebrew') == 'false' ? ' deleted the message:' : 'מחק את ההודעה:';
const EDIT = getStorItems('isHebrew') == 'false' ? ' edit the message:' : 'ערך את ההודעה:';
const MISSING_VALUES = getStorItems('isHebrew') == 'false' ? 'One or more values is missing!' : 'אחד או יותר מהפרטים חסרים';
const EMAIL_EXISTS = getStorItems('isHebrew') == 'false' ? 'the email is exists in the system!' : 'המייל הזה כבר מופיע במערכת';
const YOU_SURE_USER = getStorItems('isHebrew') == 'false' ? 'Are you sure that you want delete user ' : 'האם אתה בטוח שברצונך למחוק את המשתמש ';
const YOU_SURE_MSG = getStorItems('isHebrew') == 'false' ? 'Are you sure that you want delete msg ' : 'האם אתה בטוח שברצונך למחוק את ההודעה ';
const NO_PERMISSIONS = getStorItems('isHebrew') == 'false' ? 'You do not have permission to perform this operation!' : 'אין לך הרשאה לבצע את הפעולה!';


function changeLanguage() {
    setStorItems('isHebrew', getStorItems('isHebrew') == 'false');
    // isHebrew = !isHebrew;
}

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
        {id: 'back-description' , header: ['Back', 'חזור']},
        {id: 'icon-description' , header: ['Menu', 'תפריט']},
        {id: 'language-description' , header: ['Change Language', 'החלף שפה']},
        // {id: '' , header: ['', '']},
        // {id: '' , header: ['', '']},
        
    ];

 for (const element of labels) {
    if (byId(element.id)){
        byId(element.id).innerText = getStorItems('isHebrew') == 'true' ? element.header[1] : element.header[0];
    }
  }
}