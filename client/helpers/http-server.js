class MyHttp {
    Http = new XMLHttpRequest();
    baseUrl = BASE_URL;

    sendHttp(endPoint, type, body) {
        const url = this.baseUrl + endPoint;
        this.Http.open(type, url);
        this.Http.setRequestHeader('Content-Type', 'application/json');
        this.Http.send(body);
    }
    sendHttpFile(endPoint, type, body) {
        const url = this.baseUrl + 'users/image/' + endPoint;
        console.log(url);
        this.Http.open(type, url);
        this.Http.send(body);
    }

}