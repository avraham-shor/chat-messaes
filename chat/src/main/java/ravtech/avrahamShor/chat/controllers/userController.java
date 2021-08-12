package ravtech.avrahamShor.chat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.models.PhoneUser;
import ravtech.avrahamShor.chat.services.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class userController {

    @Autowired
    UserService service;

    @GetMapping("")
    public ResponseEntity<List<PhoneUser>> getAllUsers() {
        return service.getAll();
    }

    @PostMapping("")
    public ResponseEntity<PhoneUser> createUsers(@RequestBody PhoneUser user) {
        return service.save(user, null);
    }

    @PostMapping("/login")
    public ResponseEntity<PhoneUser> login(@RequestBody PhoneUser user) {
        return service.login(user);
    }
}
