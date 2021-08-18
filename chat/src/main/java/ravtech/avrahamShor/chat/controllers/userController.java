package ravtech.avrahamShor.chat.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.models.PhoneUser;
import ravtech.avrahamShor.chat.services.UserService;
import static ravtech.avrahamShor.chat.Configuration.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(API_USER)
public class userController extends BaseController<PhoneUser, UserService> {

    @PostMapping("/login")
    public ResponseEntity<PhoneUser> login(@RequestBody PhoneUser user) {
        return service.login(user);
    }
}
