package com.project.JuryDuty.controllers;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.JuryDuty.model.Category;
import com.project.JuryDuty.model.Contestant;
import com.project.JuryDuty.model.Result;
import com.project.JuryDuty.pojos.Vote;
import com.project.JuryDuty.repository.CategoryRepository;
import com.project.JuryDuty.repository.ContestantRepository;
import com.project.JuryDuty.repository.ResultRepository;

@RestController
@RequestMapping("/api")
public class ResultController {
	
	@Autowired
	private ResultRepository resultRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ContestantRepository contestantRepository;
	
	@GetMapping("/votes")
	Collection<Result> getAllVotes(){
		return resultRepository.findAll();
	}
	
	@PostMapping("/vote")
	public void voteContestant(@Valid @RequestBody Vote vote) {
		
		Category category = categoryRepository.findByName(vote.getCategory());
		Contestant contestant = contestantRepository.findByPairName(vote.getContestantName());
	
		//cautam rezultatul in baza de date dupa numele perechii si categorie
		Result result = resultRepository.findByContestantAndCategory(contestant, category);
		
		//daca nu gaseste nimic rezulta ca avem o inregistrare noua
		if(result == null) {
			//cream inregistrarea noua
			Result newRecord = new Result();
			newRecord.setMark(vote.getMark());
			newRecord.setCategory(category);
			newRecord.setContestant(contestant);
			resultRepository.save(newRecord);
		}else {
			//altfel updateaza suma notelor care e tinuta in mark
			result.setMark(vote.getMark() + result.getMark());
			resultRepository.save(result);
		}
		

	}
	
	

}
