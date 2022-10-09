package com.usa.reto3.reto3.services;

import com.usa.reto3.reto3.entities.Category;
import com.usa.reto3.reto3.repositories.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Retorna todas las categorias de la tabla category
    public List<Category> getAll() {
        return categoryRepository.getAll();
    }

    // Retorna una categoria que refiera al identificador id de la tabla category
    public Optional<Category> getCategory(int id) {
        return categoryRepository.getCategory(id);
    }

    // Guarda una categoria en la tabla category
    public Category save(Category category) {

        if (category.getId() == null) {
            return categoryRepository.save(category);
        } else {
            Optional<Category> b = categoryRepository.getCategory(category.getId());
            if (b.isEmpty()) {
                return categoryRepository.save(category);
            } else {
                return category;
            }
        }
    }

    // Actualiza una categoria en la tabla category
    public Category update(Category category) {

        if (category.getId() != null) {

            Optional<Category> b = categoryRepository.getCategory(category.getId());

            if (!b.isEmpty()) {

                // Se retornan los atributos en caso de que sean no nulos
                if (category.getName() != null) {
                    b.get().setName(category.getName());
                }
                if (category.getDescription() != null) {
                    b.get().setDescription(category.getDescription());
                }

                // Se realiza la actualización del objeto con ayuda del repositorio
                categoryRepository.save(b.get());
                return b.get();
            } else {
                return category;
            }
        } else {
            return category;
        }
    }

    // Elimina una categoria en la tabla category
    public boolean deleteCategory(int id) {

        Boolean bBoolean = getCategory(id).map(category -> {
            categoryRepository.delete(category);
            return true;
        }).orElse(false);

        return bBoolean;
    }

}
