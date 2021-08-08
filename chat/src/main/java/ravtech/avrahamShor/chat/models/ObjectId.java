package ravtech.avrahamShor.chat.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public abstract class ObjectId {
    @Id
    private String id;
}
