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
import com.project.JuryDuty.pojos.CategoryWrapper;
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
	
//	long getNumberCategories(){
//		return categoryRepository.count();
//	}
	
	@RequestMapping("/category")
	public Collection<Category> addCategory(@Valid @RequestBody CategoryWrapper categoryWrapper ){
		for(int i = 0; i < categoryWrapper.getNames().size(); i++) {
			Category category = new Category();
			category.setName(categoryWrapper.getNames().get(i));
			category.setWeight(1);										/*la inceput setam ponderea 1 pt fiecare categorie*/
			categoryRepository.save(category);
		}
		return categoryRepository.findAll();
	}
	
	//putem schimba ponderea unei categorii 
	@PostMapping("/changeCategoryWeight")
	public void changeCategoryWeight(@Valid @RequestBody Category category) {
		Category result = categoryRepository.findByName(category.getName());
		if(result != null) {
			result.setWeight(category.getWeight());
			categoryRepository.save(result);
		}
	}
	
	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id){
		
		categoryRepository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
}


