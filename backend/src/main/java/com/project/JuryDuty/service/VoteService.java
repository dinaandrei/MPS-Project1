package com.project.JuryDuty.service;

import java.util.List;

import com.project.JuryDuty.repository.*;
import net.bytebuddy.implementation.auxiliary.AuxiliaryType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.JuryDuty.model.Category;
import com.project.JuryDuty.model.Contest;
import com.project.JuryDuty.model.Contestant;
import com.project.JuryDuty.model.Result;
import com.project.JuryDuty.pojos.Vote;

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
	
	@Autowired
	private ContestRepository contestRepository;

	@Autowired
	private JuryAccountRepository juryAccountRepository;


	
	public void voteContestant(Vote vote) {
		Vote.counter++;
		
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

	public void endSeries() {
		
		int juryNumber = (int) juryAccountRepository.count();
		System.out.println("jury num: " + juryNumber);
		
		for(Contestant contestant : contestantRepository.findAll()) {

			List<Result> resultList = resultRepository.findAllByContestant(contestant);
			
			
			double sumMark = 0;
			for(Result result : resultList) {
				sumMark += result.getMark() * result.getCategory().getWeight();
				System.out.println(result.getMark() + " " + result.getContestant().getPairName() + " " + result.getCategory().getName() );
			}
			
			System.out.println("sum mark:" + sumMark);
			contestant.setGrade(sumMark / juryNumber);
			System.out.println("grade: " + contestant.getGrade());
			
			contestantRepository.save(contestant);
			
		}
		resultRepository.deleteAll();
		System.out.println(resultRepository.count());
	}
	
	public void endRound() {

		String typeOfContest = contestRepository.findAll().get(0).getType();
		if(typeOfContest.equals("battle")){
			int i;
			for(i = 1; i < contestantRepository.count(); i += 2){
				if(contestantRepository.findAll().get(i).getGrade() < contestantRepository.findAll().get(i + 1).getGrade()) {
					contestantRepository.deleteById((long) Math.toIntExact(i));
				} else {
					contestantRepository.deleteById((long) Math.toIntExact(i + 1));
				}
			}
		} else if (typeOfContest.equals("allTeams") || typeOfContest.equals("oneByOne")){
			for(Contestant contestant : contestantRepository.findAll()){
				if(contestant.getGrade() < contestRepository.findAll().get(0).getMinGrade()) {
					contestantRepository.delete(contestant);
				}
			}
		}

		resultRepository.deleteAll();
	}

}