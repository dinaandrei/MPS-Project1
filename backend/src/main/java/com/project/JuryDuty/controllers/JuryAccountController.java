package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.project.JuryDuty.model.JuryAccount;
import com.project.JuryDuty.repository.JuryAccountRepository;

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

	@DeleteMapping("/juryAccount/{id}")
	ResponseEntity<?> deleteJuryAccount(@PathVariable Long id){

		juryAccountRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
