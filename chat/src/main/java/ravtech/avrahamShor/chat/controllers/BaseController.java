package ravtech.avrahamShor.chat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ravtech.avrahamShor.chat.models.ObjectId;
import ravtech.avrahamShor.chat.services.BaseService;
import java.io.*;
import java.net.*;


import java.util.List;

public abstract class BaseController< T extends ObjectId ,U extends BaseService>  {
    @Autowired
    U service;

    @GetMapping("")
    public ResponseEntity<List<T>> getAllUsers() {
        return service.getAll();
    }

    @PostMapping("")
    public ResponseEntity<T> createUsers(@RequestBody T obj) {
//        this.pingToClient();
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

    private void pingToClient() {
        try{
            Socket s=new Socket("localhost",90);
            DataOutputStream dout=new DataOutputStream(s.getOutputStream());
            dout.writeUTF("Hello Server");
            System.out.println("pingToClient");
            dout.flush();
            dout.close();
            s.close();
        }catch(Exception e){e.printStackTrace();}
    }
}
