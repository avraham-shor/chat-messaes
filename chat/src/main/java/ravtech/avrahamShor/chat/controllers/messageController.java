package ravtech.avrahamShor.chat.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.db.MessageRepository;
import ravtech.avrahamShor.chat.models.Message;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class messageController {

    @Autowired
    MessageRepository messageRepository;

    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesByIds(@PathVariable("senderId") String senderId,@PathVariable("receiverId") String receiverId) {
        try {
            List<Message> messages = new ArrayList<Message>();
            messageRepository.findBySenderIdAndReceiverId(senderId, receiverId).forEach(messages::add);
            messageRepository.findBySenderIdAndReceiverId(receiverId, senderId).forEach(messages::add);
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

    @GetMapping("/count/{anotherId}/{userId}")
    public int getCountMessages(@PathVariable("anotherId") String anotherId,@PathVariable("userId") String userId) {
        int counter = messageRepository.findBySenderIdAndReceiverId(anotherId, userId).size();
        return counter;
    }

    @PostMapping("")
    public ResponseEntity<Message> createMessage(@RequestBody  Message msg) {
        System.out.println(msg);
        Date date = new Date();
        msg.setDate(date);
        msg.setDateTime(getFormatDate());
        try {
            Message message = messageRepository.save(msg);
            System.out.println("after sava: " + message);
            return new ResponseEntity<>(message, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static String getFormatDate() {
        String pattern = "dd/MM/YYYY HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        return date;
    }


}
