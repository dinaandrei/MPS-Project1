package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;

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
	public void addCategory(@RequestBody List<String> categoryList ){
		for(int i = 0; i < categoryList.size(); i++) {
			Category category = new Category();
			category.setName(categoryList.get(i));
			categoryRepository.save(category);
		}

	}
	
	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id){
		
		categoryRepository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
}


