package com.usa.reto3.reto3.repositories;

import com.usa.reto3.reto3.entities.Boat;
import com.usa.reto3.reto3.repositories.crudRepositories.BoatCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoatRepository {
    
    @Autowired
    private BoatCrudRepository boatCrudRepository;
    
    // Retorna todos los botes de la tabla boat
    public List<Boat> getAll(){ return (List<Boat>) boatCrudRepository.findAll(); }
    
    // Retorna un bote que refiera al identificador id de la tabla boat
    public Optional<Boat> getBoat( int id ) { return boatCrudRepository.findById(id); }
    
    // Guarda un bote en la tabla boat
    public Boat save( Boat boat ) { return boatCrudRepository.save(boat); }
    
    // Borra un bote de la tabla boat
    public void delete( Boat boat ) { boatCrudRepository.delete(boat); } 
    
}
