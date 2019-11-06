package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.JuryDuty.model.Category;
import com.project.JuryDuty.repository.CategoryRepository;
import com.project.JuryDuty.service.RoundAndSeriesService;

@RestController
@RequestMapping("/admin")
public class CategoryController {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/categories")
	Collection<Category> getCategories(){
		return categoryRepository.findAll();
	}
	
	@PostMapping("/category")
	ResponseEntity<Category> addCategory(@Valid @RequestBody Category category) throws URISyntaxException{
		
		Category result = categoryRepository.save(category);
		
		return ResponseEntity.created(new URI("/admin/category" + result.getId())).body(result);
	}
	
	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id){
		
		categoryRepository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
}
