package ravtech.avrahamShor.chat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import ravtech.avrahamShor.chat.db.MessageRepository;
import ravtech.avrahamShor.chat.models.Message;
import ravtech.avrahamShor.chat.models.RequestMethod;
import ravtech.avrahamShor.chat.models.socketResponse;

import java.util.*;

@Repository
public class MessageService extends BaseService<Message, MessageRepository>{
    @Autowired
    UserService userService;

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

    @Override
    public ResponseEntity<Message> save(Message msg) {
        Date date = new Date();
        msg.setDate(date);
        msg.setDateTime(getFormatDate());
        callSocket(msg, RequestMethod.POST);
        return super.save(msg);
    }

    @Override
    public ResponseEntity<String> delete(String id) {
        if (id != null && repo.findById(id).isPresent()) {
            Message msg = repo.findById(id).get();
            callSocket(msg, RequestMethod.DELETE);
        }
        return super.delete(id);
    }

    @Override
    public ResponseEntity<Message> update(Message msg, String id) {
        if (id == null) return new ResponseEntity<>(null, HttpStatus.UNPROCESSABLE_ENTITY);
        if (repo.findById(id).isEmpty()) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        callSocket(msg, RequestMethod.PUT);
        return super.save(msg);
    }

    public void callSocket( Message msg, RequestMethod method){
        System.out.println(msg);

        this.template.convertAndSend("/topic/greetings", new socketResponse(msg.getReceiverId() ,msg.getText(), userService.getUser(msg.getSenderId()), method));
    }



}
