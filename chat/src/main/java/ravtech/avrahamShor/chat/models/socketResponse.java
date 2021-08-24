package ravtech.avrahamShor.chat.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class socketResponse {
    private String id, text;
    private PhoneUser user;
    private RequestMethod method;
}