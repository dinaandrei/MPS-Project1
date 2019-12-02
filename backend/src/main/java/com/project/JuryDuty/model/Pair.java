package com.project.JuryDuty.model;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
public class Pair {
	
	private ResponseEntity<?> response;
	private boolean createJuryAccount;
	
	public Pair(ResponseEntity<?> response, boolean createJuryAccount){
		this.response = response;
		this.createJuryAccount = createJuryAccount;
	}

}
