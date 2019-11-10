package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.JuryDuty.model.Contestant;
import com.project.JuryDuty.repository.ContestantRepository;

@RestController
@RequestMapping("/api")
public class ContestantController {
	
	private ContestantRepository contestantRepository;
	
	public ContestantController(ContestantRepository contestantRepository) {
		super();
		this.contestantRepository = contestantRepository;
	}

	//listare concurenti
	@GetMapping("/contestants")
	Collection<Contestant> getContestants(){
		return contestantRepository.findAll();
	}
	
	//adaugare concurenti
	@PostMapping("/contestant")
	public void addContestant(@Valid @RequestBody List<String> contestantList){
		
		for(int i = 0; i < contestantList.size(); i++) {
			Contestant contestant = new Contestant();
			contestant.setGrade(0);
			contestant.setPairName(contestantList.get(i));
			
			contestantRepository.save(contestant);
		}
	}
	
	
	//descalificare concurent
	@DeleteMapping("/contestant/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id){
		contestantRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
