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