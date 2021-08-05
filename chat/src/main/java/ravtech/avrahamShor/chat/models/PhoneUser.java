package ravtech.avrahamShor.chat.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
@Getter
@Setter
public class PhoneUser extends User {
    @NonNull
    private String phone;

    public PhoneUser(String username, String email, String password, String phone) {
        super(username, email, password);
        if (validatePhone(phone)) {
            this.phone = makePhoneGlobally(phone);
        }
    }

    public PhoneUser(String email, String password) {
        super(email, password);
    }

    public static boolean validatePhone(String phone) throws NumberFormatException {
        boolean startWithZero = phone.substring(0, 9).startsWith("05");
        if (phone.length() == 10 && startWithZero) {
            return true;
        }
        else throw new NumberFormatException();
    }

    private static String makePhoneGlobally(String phone) {
        return "+972" + phone.substring(1, phone.length() - 1);
    }

    public PhoneUser() {
        super();
    }

}
