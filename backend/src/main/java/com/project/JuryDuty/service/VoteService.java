package com.project.JuryDuty.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.JuryDuty.model.Category;
import com.project.JuryDuty.model.Contestant;
import com.project.JuryDuty.model.Result;
import com.project.JuryDuty.pojos.Vote;
import com.project.JuryDuty.repository.CategoryRepository;
import com.project.JuryDuty.repository.ContestantRepository;
import com.project.JuryDuty.repository.ResultRepository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Service
public class VoteService {
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ContestantRepository contestantRepository;
	
	@Autowired
	private ResultRepository resultRepository;
	
	public void voteContestant(Vote vote) {
		Category category = categoryRepository.findByName(vote.getCategory());
		Contestant contestant = contestantRepository.findByPairName(vote.getContestantName());
	
		//cautam rezultatul in baza de date dupa categorie si numele perechii
		Result result = resultRepository.findByContestantAndCategory(contestant, category);
		
		//daca nu gaseste nimic rezulta ca avem o inregistrare noua
		if(result == null) {
			//cream inregistrarea noua
			Result newRecord = new Result();
			newRecord.setMark(vote.getMark());
			newRecord.setCategory(category);
			newRecord.setContestant(contestant);
			resultRepository.save(newRecord);
		}else {
			//altfel updateaza suma notelor care e tinuta in mark
			result.setMark(vote.getMark() + result.getMark());
			resultRepository.save(result);
		}
	}
	
	
}
