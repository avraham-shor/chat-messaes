package ravtech.avrahamShor.chat.services;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import ravtech.avrahamShor.chat.db.UserRepository;
import ravtech.avrahamShor.chat.models.PhoneUser;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

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
    public ResponseEntity<PhoneUser> save(PhoneUser user) {
        if (isEmailExist(user.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return super.save(user);
    }

    public ResponseEntity<PhoneUser> update(PhoneUser user, String id) {
        if (id == null) return new ResponseEntity<>(null, HttpStatus.UNPROCESSABLE_ENTITY);
        if (repo.findById(id).isEmpty()) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return super.save(user);
    }

    private boolean isEmailExist(String email) {
        int contain = repo.findByEmail(email).size();
        return contain != 0;
    }

    public PhoneUser getUser(String id) {
        if (repo.findById(id).isPresent()) return repo.findById(id).get();
        return null;
    }
}
