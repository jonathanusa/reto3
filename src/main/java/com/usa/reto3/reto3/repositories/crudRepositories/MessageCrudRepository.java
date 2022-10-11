package com.usa.reto3.reto3.repositories.crudRepositories;

import com.usa.reto3.reto3.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer>{
    
}
