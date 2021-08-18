package ravtech.avrahamShor.chat.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.models.Message;
import ravtech.avrahamShor.chat.services.MessageService;
import static ravtech.avrahamShor.chat.Configuration.*;
import java.util.List;




@RestController
@RequestMapping(API_MESSAGES)
@CrossOrigin(origins = "*")
public class messageController extends BaseController<Message, MessageService>{

    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesByIds(@PathVariable("senderId") String senderId,@PathVariable("receiverId") String receiverId) {
        return service.getMessagesByIds(senderId, receiverId);
    }

    @GetMapping("/count/{anotherId}/{userId}")
    public int getCountMessages(@PathVariable("anotherId") String anotherId,@PathVariable("userId") String userId) {
        return service.getCountMessages(anotherId, userId);
    }

}