package ravtech.avrahamShor.chat.models;

import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
public class User extends ObjectId  {
    private String username, email, password;

    public User(String username, String email, String password) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
