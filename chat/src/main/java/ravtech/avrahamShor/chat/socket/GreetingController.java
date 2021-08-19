package ravtech.avrahamShor.chat.socket;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(Message message) {
//        Thread.sleep(1000); // simulated delay
        return "Connect to AvraTech";
    }

}
