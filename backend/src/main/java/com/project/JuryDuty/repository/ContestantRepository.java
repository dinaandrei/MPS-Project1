package com.project.JuryDuty.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.project.JuryDuty.model.Contestant;
public interface ContestantRepository extends JpaRepository<Contestant, Long>{
	Contestant findByPairName(String name);
}
