package com.project.JuryDuty.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="contest")
public class Contest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String type;
	
	private int numberOfRounds;
	
	private int numberOfSeries;
	
	private int contestantsPerSeries;
	
	private String username;
	
	private String password;
	
	private List<Integer> minGrade;
	
}
