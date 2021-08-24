function LoginUser(email, password) {
    this.email = email;
    this.password = password;
}

function User(phone, email, id, username, password) {
    this.phone = phone;
    this.email = email;
    this.id = id;
    this.username = username;
    this.password = password;
}

function User(id, username) {
    this.id = id;
    this.username = username;
}
class Register {
    constructor(username, email, password, phone) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}

function SocketResponse(id, text, method, username, email, password, phone) {
    this.id = id;
    this.text = text;
    this.user = new Register(username, email, password, phone);
    this.method = method;
    
}