package ravtech.avrahamShor.chat.db;

import ravtech.avrahamShor.chat.models.PhoneUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UserRepository extends MongoRepository<PhoneUser, String> {
    List<PhoneUser> findByEmailAndPassword(String email, String password);
    List<PhoneUser> findByEmail(String email);

}






//
