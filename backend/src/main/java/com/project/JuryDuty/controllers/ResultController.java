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
import com.project.JuryDuty.service.VoteService;

@RestController
@RequestMapping("/api")
public class ResultController {
	
	@Autowired
	private ResultRepository resultRepository;
	
	/*@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ContestantRepository contestantRepository;*/
	
	@Autowired
	private VoteService voteService;
	
	@GetMapping("/votes")
	Collection<Result> getAllVotes(){
		return resultRepository.findAll();
	}
	
	@PostMapping("/vote")
	public void voteContestant(@Valid @RequestBody Vote vote) {
		voteService.voteContestant(vote);
	}
	
	

}
