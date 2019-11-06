package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.JuryDuty.model.Contest;
import com.project.JuryDuty.repository.ContestRepository;
import com.project.JuryDuty.service.RoundAndSeriesService;

@RestController
@RequestMapping("/admin")
public class ContestController {
	
	@Autowired
	private ContestRepository contestRepository;
	
	@Autowired
	private RoundAndSeriesService roundAndSeriesService;
	
	@GetMapping("/contestData")
	Collection<Contest> getContestData() {
		return contestRepository.findAll();
	}
	
	@PostMapping("/addContest")
	ResponseEntity<Contest> setupContest(@Valid @RequestBody Contest contest) throws URISyntaxException{
		Contest result = contestRepository.save(contest);
		
		return ResponseEntity.created(new URI("/admin/addContest" + result.getId())).body(result);
	}
	
	@PostMapping("/startRound")
	public void startRound() {
		roundAndSeriesService.setRoundStarted(true);
		//System.out.println("runda a inceput: " + roundAndSeriesService.isRoundStarted());
	}
	
	@PostMapping("/endRound")
	public void endRound() {
		
		roundAndSeriesService.setRoundStarted(false);
		//TODO: avanseaza primii(insert predefined value here) deci tot ce cred ca ar trebuie facut e sa scoatem competitorii descalificati(cei cu nota < predefined value) din tabela contestant
	}
	
	@PostMapping("/startSeries")
	public void startSeries() {
		roundAndSeriesService.setSeriesStarted(true);
	}
	
	@PostMapping("/endSeries")
	public void endSeries() {
		roundAndSeriesService.setSeriesStarted(false);
		
		//TODO: CALCULAREA NOTELOR PER CONCURENT
	}
	
}
