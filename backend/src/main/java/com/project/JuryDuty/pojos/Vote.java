package com.project.JuryDuty.pojos;



import com.project.JuryDuty.model.Contestant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vote {
	private int mark;
	
	private String contestantName;
	
	private String category;
}
