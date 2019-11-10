package com.project.JuryDuty.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.JuryDuty.model.Category;
import com.project.JuryDuty.model.Contestant;
import com.project.JuryDuty.model.Result;
public interface ResultRepository extends JpaRepository<Result, Long>{
	Result findByContestantAndCategory(Contestant contestant, Category category);
}