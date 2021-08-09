const LOCAL = true;

const PORT = LOCAL? '8080' : '8081';
const BASE_URL = 'http://localhost:' + PORT + '/api/';
const BASE_URL_MESSAGES = BASE_URL + 'messages';
const BASE_URL_USERS = BASE_URL + 'users/';