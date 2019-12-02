package com.project.JuryDuty.controllers;

import java.net.URISyntaxException;
import java.util.Collection;
import java.util.concurrent.atomic.AtomicInteger;

import com.project.JuryDuty.model.AdminAccount;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.project.JuryDuty.model.JuryAccount;
import com.project.JuryDuty.model.Pair;
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

    @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/verifyJuryAccount")
	Pair verifyJuryAccount(@Valid @RequestBody JuryAccount juryAccount) throws URISyntaxException{
	
		for(JuryAccount jury : juryAccountRepository.findAll()) {
			System.out.println(jury.getPassword());
			
			if(juryAccount.getPassword().equals(jury.getPassword()) && juryAccount.getUsername().equals(jury.getUsername())){
				System.out.println("ok");
				return new Pair(new ResponseEntity(HttpStatus.OK), false);
			} 
			 
		}
		
		if(juryAccount.getPassword().equals("jury") && juryAccount.getUsername().equals("jury")){
			System.out.println("ok");
			return new Pair(new ResponseEntity(HttpStatus.OK), true);
		} else {
			System.out.println("forbidden");
			return new Pair( new ResponseEntity<>(HttpStatus.FORBIDDEN), false);
		}

	}


	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/juryAccount")
	ResponseEntity<?> setupJuryAccount(@Valid @RequestBody JuryAccount juryAccount) throws URISyntaxException{
		Collection<JuryAccount> all = juryAccountRepository.findAll();
		AtomicInteger ok = new AtomicInteger(1);
		all.forEach(
			(n) -> {
				if(n.getPassword().equals(juryAccount.getPassword())) {
					ok.set(0);
				};
			}
		);

		if(ok.get() == 1 ){
			JuryAccount result = juryAccountRepository.save(juryAccount);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}

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
