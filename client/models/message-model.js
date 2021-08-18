class Message {
    constructor(text, senderId, receiverId, dateTime=null, date=null, id=null) {
        this.id = id;
        this.dateTime = dateTime;
        this.date = date;
        this.text = text;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}