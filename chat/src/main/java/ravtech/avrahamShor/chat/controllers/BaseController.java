package ravtech.avrahamShor.chat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ravtech.avrahamShor.chat.models.ObjectId;
import ravtech.avrahamShor.chat.services.BaseService;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public abstract class BaseController< T extends ObjectId ,U extends BaseService>  {
    @Autowired
    protected U service;


    @GetMapping("")
    public ResponseEntity<List<T>> getAllObjects() {
        return service.getAll();
    }

    @PostMapping("")
    public ResponseEntity<T> createUsers(@RequestBody T obj) {
        System.out.println(obj);
        return service.save(obj);
    }

    @PutMapping("/image/{userId}")
    public ResponseEntity<?> handleFileUpload( @RequestParam("file") MultipartFile file , @PathVariable("userId") String userId) {
        return service.saveAvatar(file, userId);
    }

    @PutMapping("/{id}")
    ResponseEntity<U> editMessage(@RequestBody  T obj, @PathVariable("id") String id) {
        return service.update(obj, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") String messageId) {
        return service.delete(messageId);
    }

}
