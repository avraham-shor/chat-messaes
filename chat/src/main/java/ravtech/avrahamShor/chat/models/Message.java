package ravtech.avrahamShor.chat.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "message")
public class Message extends BaseMessage implements Comparable<Message>{


    public Message(String text, String receiverId, String senderId) {
        super(text, receiverId, senderId);
    }

    public Message() {
        super();
    }

    @Override
    public int compareTo(Message msg) {
        return msg.getDate().compareTo(this.getDate());
    }

}


