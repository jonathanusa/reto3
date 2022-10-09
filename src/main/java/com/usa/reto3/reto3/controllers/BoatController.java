package com.usa.reto3.reto3.controllers;

import com.usa.reto3.reto3.entities.Boat;
import com.usa.reto3.reto3.services.BoatService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Boat")
public class BoatController {
    
    @Autowired
    private BoatService boatService;
    
    // Endpoint para retornar todos los elementos de la tabla
    @GetMapping("/all")
    public List<Boat> getBoats(){ return boatService.getAll(); }
    
    // Endpoint para retornar un elemento particular de la tabla
    @GetMapping("/{id}")
    public Optional<Boat> getBoat( @PathVariable("id") int boatId ){
        return boatService.getBoat(boatId);
    }
    
    @PostMapping("/save")
    public Boat save( @RequestBody Boat boat ){ return boatService.save(boat); }
    
    @PutMapping("/update")
    public Boat update( @RequestBody Boat boat ){ return boatService.update(boat); }
    
    @DeleteMapping("/{id}")
    public boolean delete( @PathVariable("id") int boatId ){
        return boatService.deleteBoat(boatId);
    }
    
}
