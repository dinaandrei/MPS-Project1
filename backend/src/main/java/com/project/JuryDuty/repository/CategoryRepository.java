package com.project.JuryDuty.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.JuryDuty.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{
	Category findByName(String name);
}
