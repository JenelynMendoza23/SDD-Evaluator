package com.sdd.evaluator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EvaluationResponse {
    private Long id;
    private String documentName;
    private String documentSource;
    private Double evaluationScore;
    private String evaluationFeedback;
    private Double structureScore;
    private Double completenessScore;
    private Double qualityScore;
    private LocalDateTime evaluatedAt;
    private LocalDateTime createdAt;
}
