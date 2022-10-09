
package com.usa.reto3.reto3.repositories;

import com.usa.reto3.reto3.entities.Category;
import com.usa.reto3.reto3.repositories.crudRepositories.CategoryCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {
    
    @Autowired
    private CategoryCrudRepository categoryCrudRepository;
    
    // Retorna todos las categorias de la tabla category
    public List<Category> getAll(){ return (List<Category>) categoryCrudRepository.findAll(); }
    
    // Retorna una categoria que refiera al identificador id de la tabla category
    public Optional<Category> getCategory( int id ) { return categoryCrudRepository.findById(id); }
    
    // Guarda una categoria en la tabla category
    public Category save( Category category ) { return categoryCrudRepository.save(category); }
    
    // Borra una categoria de la tabla category
    public void delete( Category category ) { categoryCrudRepository.delete(category); }
}
