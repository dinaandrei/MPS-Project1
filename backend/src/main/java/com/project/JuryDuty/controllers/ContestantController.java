package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

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
import com.project.JuryDuty.pojos.ContestantWrapper;
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
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/contestants")
	Collection<Contestant> getContestants(){
		return contestantRepository.findAll();
	}
	
	//adaugare concurenti
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/contestant")
	public void addContestant(@Valid @RequestBody ContestantWrapper contestantWrapper){
		
		for(int i = 0; i < contestantWrapper.getPairNames().size(); i++) {
			Contestant contestant = new Contestant();
			contestant.setGrade(0);
			contestant.setPairName(contestantWrapper.getPairNames().get(i));
			
			contestantRepository.save(contestant);
		}
	}
	
	
	//descalificare concurent
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/contestant/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id){
		contestantRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
