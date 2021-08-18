package ravtech.avrahamShor.chat.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import ravtech.avrahamShor.chat.db.MessageRepository;
import ravtech.avrahamShor.chat.models.Message;

import java.util.*;

@Repository
public class MessageService extends BaseService<Message, MessageRepository>{


    public ResponseEntity<List<Message>> getMessagesByIds(String senderId, String receiverId) {
        try {
            List<Message> messages = new ArrayList<>();
            messages.addAll(repo.findBySenderIdAndReceiverId(senderId, receiverId));
            messages.addAll(repo.findBySenderIdAndReceiverId(receiverId, senderId));
            Collections.sort(messages);
            if (messages.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public int getCountMessages(String anotherId,String userId) {
        return repo.findBySenderIdAndReceiverId(anotherId, userId).size();
    }

    @Override
    public ResponseEntity<Message> save(Message msg) {
        Date date = new Date();
        msg.setDate(date);
        msg.setDateTime(getFormatDate());
        return super.save(msg);
    }
    @Override
    public ResponseEntity<Message> update(Message msg, String id) {
        if (id == null) return new ResponseEntity<>(null, HttpStatus.UNPROCESSABLE_ENTITY);
        if (repo.findById(id).isEmpty()) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return super.save(msg);
    }



}
