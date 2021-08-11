package ravtech.avrahamShor.chat.db;

import org.springframework.data.mongodb.repository.MongoRepository;
import ravtech.avrahamShor.chat.models.Message;
import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findBySenderIdAndReceiverId(String senderId, String receiverId);
}
