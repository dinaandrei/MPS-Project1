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

import com.project.JuryDuty.model.JuryAccount;
import com.project.JuryDuty.model.JuryAccount;
import com.project.JuryDuty.repository.JuryAccountRepository;
import com.project.JuryDuty.repository.JuryAccountRepository;
import com.project.JuryDuty.service.RoundAndSeriesService;
import com.project.JuryDuty.service.VoteService;

@RestController
@RequestMapping("/admin")

public class JuryAccountController {
	
	@Autowired
	private JuryAccountRepository juryAccountRepository; 
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/juryAccounts")
	Collection<JuryAccount> getJuryAccount() {
		return juryAccountRepository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/juryAccount")
	ResponseEntity<JuryAccount> setupJuryAccount(@Valid @RequestBody JuryAccount JuryAccount) throws URISyntaxException{
		JuryAccount result = juryAccountRepository.save(JuryAccount);
		
		return ResponseEntity.created(new URI("/admin/addJuryAccount" + result.getId())).body(result);
	}
	
}
