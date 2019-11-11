package com.project.JuryDuty.service;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class RoundAndSeriesService {
	private boolean roundStarted;
	
	private boolean seriesStarted;
	
	
}
