package com.project.JuryDuty.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.JuryDuty.model.Category;
import com.project.JuryDuty.model.Contestant;
import com.project.JuryDuty.model.Result;
public interface ResultRepository extends JpaRepository<Result, Long>{
	Result findByContestantAndCategory(Contestant contestant, Category category);
	List<Result> findAllByContestant(Contestant contestant);
	void deleteByContestant(Contestant contestant);
}
