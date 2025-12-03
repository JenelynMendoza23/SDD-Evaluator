package com.sdd.evaluator.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationRequest {
    
    @NotBlank(message = "Google Drive link is required")
    private String driveLink;
}
