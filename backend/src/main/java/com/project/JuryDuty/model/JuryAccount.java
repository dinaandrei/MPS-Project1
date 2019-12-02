package com.project.JuryDuty.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@Data
@Table(name="juryAccount")
public class JuryAccount {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
//	private String usernameRootAdmin;
//	private String passwordRootAdmin;
//	
//	private String usernameJury;
//	private String passwordJury;
	
	private String username;
	private String password;

	private boolean isAdmin = false;
	private boolean createJuryAccount;
	
}