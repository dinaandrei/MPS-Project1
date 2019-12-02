package com.project.JuryDuty.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import com.project.JuryDuty.model.AdminAccount;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.project.JuryDuty.model.JuryAccount;
import com.project.JuryDuty.repository.JuryAccountRepository;
import com.project.JuryDuty.repository.AdminAccountRepository;

@RestController
@RequestMapping("/admin")

public class JuryAccountController {
	
	@Autowired
	private JuryAccountRepository juryAccountRepository; 
	private AdminAccountRepository adminAccountRepository;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/juryAccounts")
	Collection<JuryAccount> getJuryAccount() {
		return juryAccountRepository.findAll();
	}

	@PostMapping("/verifyJuryAccount")
	@CrossOrigin(origins = "http://localhost:3000")

	ResponseEntity<?> verifyJuryAccount(@Valid @RequestBody JuryAccount juryAccount) throws URISyntaxException{
		
		if(juryAccount.isCreateJuryAccount() == true) {
					
			if(juryAccount.getPassword().equals("jury") && juryAccount.getUsername().equals("jury")){
				System.out.println("ok");
				return new ResponseEntity(HttpStatus.OK);
			} else {
				System.out.println("forbidden");
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
		} else {
			
			System.out.println(juryAccountRepository.count());
			for(JuryAccount jury : juryAccountRepository.findAll()) {
				System.out.println(jury.getPassword());
				if(juryAccount.getPassword().equals(jury.getPassword()) && juryAccount.getUsername().equals(jury.getUsername())){
					System.out.println("ok");
					return new ResponseEntity(HttpStatus.OK);
				} 
				 
			}
			 
		
			System.out.println(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			
		}
		
		
	}


	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/juryAccount")
	ResponseEntity<JuryAccount> setupJuryAccount(@Valid @RequestBody JuryAccount juryAccount) throws URISyntaxException{
		JuryAccount result = juryAccountRepository.save(juryAccount);

		return ResponseEntity.created(new URI("/admin/addJuryAccount" + result.getId())).body(result);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/adminAccount")
	ResponseEntity<?> setupAdminAccount(@Valid @RequestBody AdminAccount AdminAccount) throws URISyntaxException{
		if(AdminAccount.getPassword().equals("admin") && AdminAccount.getUsername().equals("admin")) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
	}

	@DeleteMapping("/juryAccount/{id}")
	ResponseEntity<?> deleteJuryAccount(@PathVariable Long id){

		juryAccountRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}