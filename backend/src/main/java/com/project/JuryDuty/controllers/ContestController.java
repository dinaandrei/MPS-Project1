package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import org.springframework.web.bind.annotation.CrossOrigin;

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
import com.project.JuryDuty.service.VoteService;

@RestController
@RequestMapping("/admin")
public class ContestController {
	
	@Autowired
	private ContestRepository contestRepository;
	
	@Autowired
	private RoundAndSeriesService roundAndSeriesService;
	
	@Autowired
	private VoteService voteService;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/contestData")
	Collection<Contest> getContestData() {
		return contestRepository.findAll();
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addContest")
	ResponseEntity<Contest> setupContest(@Valid @RequestBody Contest contest) throws URISyntaxException{
		Contest result = contestRepository.save(contest);
		return ResponseEntity.created(new URI("/admin/addContest" + result.getId())).body(result);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/startRound")
	public int startRound() {
		roundAndSeriesService.setRoundStarted(true);
		return contestRepository.findAll().get(0).getCurrentRound();
		
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/endRound")
	public void endRound() {
	
		roundAndSeriesService.setRoundStarted(false);
		voteService.endRound();
		
		Contest contest = contestRepository.findAll().get(0);
		contest.setCurrentRound(contest.getCurrentRound() + 1);
		contestRepository.save(contest);
		
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/startSeries")
	public int startSeries() {
		roundAndSeriesService.setSeriesStarted(true);
		return contestRepository.findAll().get(0).getCurrentSerie();
		
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/endSeries")
	public void endSeries() {
		roundAndSeriesService.setSeriesStarted(false);
		voteService.endSeries();
		contestRepository.findAll().get(0).setCurrentSerie(contestRepository.findAll().get(0).getCurrentSerie() + 1);
		
		Contest contest = contestRepository.findAll().get(0);
		contest.setCurrentSerie(contest.getCurrentSerie() + 1);
		contestRepository.save(contest);		
	}
	
}
