package com.usa.reto3.reto3.services;

import com.usa.reto3.reto3.entities.Reservation;
import com.usa.reto3.reto3.repositories.ReservationRepository;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    // Retorna todos los elementos de la tabla reservation
    public List<Reservation> getAll() { return reservationRepository.getAll(); }
    
    // Retorna un elemento que refiera al identificador id de la tabla reservation
    public Optional<Reservation> getReservation( int id ) { return reservationRepository.getReservation(id); }
    
    // Guarda un elemento en la tabla reservation
    public Reservation save( Reservation reservation ) { 
        
        if (reservation.getIdReservation()== null) {
            reservation.setStatus("created");
            
            if (reservation.getStartDate()== null){
                Date current_time = new Date();
                
                current_time.setTime(current_time.getTime()-5*3600000);
                reservation.setStartDate(current_time);
            }
            return reservationRepository.save(reservation);
        }
        else{
            Optional<Reservation> b = reservationRepository.getReservation(reservation.getIdReservation());
            if ( b.isEmpty() ){ return reservationRepository.save(reservation); }
            else{ return reservation; }
        }
    }
    
    // Actualiza un elemento en la tabla reservation
    public Reservation update ( Reservation reservation ){
        
        if( reservation.getIdReservation()!= null ){
            
            Optional<Reservation> b = reservationRepository.getReservation(reservation.getIdReservation());
            
            if( !b.isEmpty() ){
                
                // Se retornan los atributos en caso de que sean no nulos
                if( reservation.getStartDate()!= null ){ b.get().setStartDate(reservation.getStartDate()); }
                if( reservation.getDevolutionDate()!= null ){ b.get().setDevolutionDate(reservation.getDevolutionDate()); }
                if( reservation.getStatus()!= null ){ b.get().setStatus(reservation.getStatus()); }
                if( reservation.getClient()!= null ){ b.get().setClient(reservation.getClient()); }
                if( reservation.getBoat()!= null ){ b.get().setBoat(reservation.getBoat()); }
                if( reservation.getScore()!= null ){ b.get().setScore(reservation.getScore()); }
                
                // Se realiza la actualización del objeto con ayuda del repositorio
                reservationRepository.save(b.get());
                return b.get();
            }
            else{
                return reservation;
            }
        }
        else{
            return reservation;
        }
    }
    
    // Elimina un elemento en la tabla reservation
    public boolean deleteReservation( int id ){
        
        Boolean bBoolean = getReservation(id).map( reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        
        return bBoolean;
    }
    
}

