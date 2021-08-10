package ravtech.avrahamShor.chat.services;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import ravtech.avrahamShor.chat.models.ObjectId;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


//@Service
//@Configurable
//@Data
//@AllArgsConstructor
@Repository
//@NoArgsConstructor

public abstract class BaseService<T extends ObjectId, U extends MongoRepository<T,String>> {

    @Autowired
    protected U repo;


    public ResponseEntity<List<T>> getAll() {
        try {
            List<T> objects = new ArrayList<>(repo.findAll());

            if (objects.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(objects, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<T> save(T obj) {
        System.out.println(obj);
        try {
            T _obj = repo.save(obj);
            return new ResponseEntity<>(_obj, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static String getFormatDate() {
        String pattern = "dd/MM/YYYY HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        return simpleDateFormat.format(new Date());
    }
}


