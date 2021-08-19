package ravtech.avrahamShor.chat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.models.ObjectId;
import ravtech.avrahamShor.chat.services.BaseService;

import java.util.List;

public abstract class BaseController< T extends ObjectId ,U extends BaseService>  {
    @Autowired
    protected U service;


    @GetMapping("")
    public ResponseEntity<List<T>> getAllUsers() {
        return service.getAll();
    }

    @PostMapping("")
    public ResponseEntity<T> createUsers(@RequestBody T obj) {
        return service.save(obj);
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
