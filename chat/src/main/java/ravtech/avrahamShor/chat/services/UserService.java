package ravtech.avrahamShor.chat.services;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ravtech.avrahamShor.chat.db.UserRepository;
import ravtech.avrahamShor.chat.models.PhoneUser;

@EqualsAndHashCode(callSuper = true)
@Service
@Data
public class UserService extends BaseService<PhoneUser, UserRepository> {

    public ResponseEntity<PhoneUser> login(PhoneUser user) {
        System.out.println(user);
        try {
            PhoneUser _user = repo.findPhonUserByEmailAndPassword(user.getEmail(), user.getPassword());
            return new ResponseEntity<>(_user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<PhoneUser> save(PhoneUser user, String id) {
        if (isEmailExist(user.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return super.save(user, null);
    }

    private boolean isEmailExist(String email) {
        int contain = repo.findByEmail(email).size();
        return contain != 0;
    }
}
