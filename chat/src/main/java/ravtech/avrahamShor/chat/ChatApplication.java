package ravtech.avrahamShor.chat;

import ch.qos.logback.classic.pattern.MessageConverter;
import lombok.extern.java.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ravtech.avrahamShor.chat.models.Message;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;

@SpringBootApplication
public class ChatApplication {

	public static void main(String[] args) {
		System.out.println("Application started");
		SpringApplication.run(ChatApplication.class, args);

	}



}
