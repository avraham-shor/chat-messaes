package ravtech.avrahamShor.chat.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.models.Message;
import ravtech.avrahamShor.chat.services.MessageService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class messageController {

    @Autowired
    MessageService service;

    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesByIds(@PathVariable("senderId") String senderId,@PathVariable("receiverId") String receiverId) {
        return service.getMessagesByIds(senderId, receiverId);
    }

    @GetMapping("/count/{anotherId}/{userId}")
    public int getCountMessages(@PathVariable("anotherId") String anotherId,@PathVariable("userId") String userId) {
        return service.getCountMessages(anotherId, userId);
    }

    @PostMapping("")
    public ResponseEntity<Message> createMessage(@RequestBody  Message msg) {
        return service.save(msg);
    }
}