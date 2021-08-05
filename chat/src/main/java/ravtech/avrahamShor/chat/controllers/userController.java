package ravtech.avrahamShor.chat.controllers;
import ravtech.avrahamShor.chat.models.PhoneUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.db.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class userController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<List<PhoneUser>> getAllUsers() {
        try {
            List<PhoneUser> users = new ArrayList<PhoneUser>();
            userRepository.findAll().forEach(users::add);

            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("")
    public ResponseEntity<PhoneUser> createUsers(@RequestBody  PhoneUser user) {
        System.out.println(user);
        try {
            PhoneUser _user = userRepository.save(user);
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<PhoneUser> login(@RequestBody PhoneUser user) {
        System.out.println(user);
        try {
            PhoneUser _user = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword()).get(0);
            return new ResponseEntity<>(_user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
