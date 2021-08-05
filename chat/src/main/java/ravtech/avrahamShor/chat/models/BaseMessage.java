package ravtech.avrahamShor.chat.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import java.util.Date;


@NoArgsConstructor
@Data
//@RequiredArgsConstructor
public abstract class BaseMessage {

    @Id
    private String id;
    private Date date;
    private String dateTime;
    @NonNull
    private String text, receiverId, senderId;

    public BaseMessage(@NonNull String text, @NonNull String receiverId, @NonNull String senderId) {
        this.text = text;
        this.receiverId = receiverId;
        this.senderId = senderId;
    }
}
