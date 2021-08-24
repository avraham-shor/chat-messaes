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

    @GetMapping("/ids")
    @ResponseBody
    public ResponseEntity<List<Message>> getMessagesByIds(@RequestParam(name = "senderId") String senderId,@RequestParam(name = "receiverId") String receiverId) {
        return service.getMessagesByIds(senderId, receiverId);
    }

}