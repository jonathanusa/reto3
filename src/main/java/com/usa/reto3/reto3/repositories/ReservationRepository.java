package com.usa.reto3.reto3.repositories;

import com.usa.reto3.reto3.entities.Reservation;
import com.usa.reto3.reto3.repositories.crudRepositories.ReservationCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    
    // Retorna todos los elementos de la tabla reservation
    public List<Reservation> getAll(){ return (List<Reservation>) reservationCrudRepository.findAll(); }
    
    // Retorna un elemento que refiera al identificador id de la tabla reservation
    public Optional<Reservation> getReservation( int id ) { return reservationCrudRepository.findById(id); }
    
    // Guarda un elemento en la tabla reservation
    public Reservation save( Reservation reservation ) { return reservationCrudRepository.save(reservation); }
    
    // Borra un elemento de la tabla reservation
    public void delete( Reservation reservation ) { reservationCrudRepository.delete(reservation); } 
    
}
