package com.sdd.evaluator.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "evaluations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "document_name", nullable = false)
    private String documentName;
    
    @Column(name = "document_source", nullable = false)
    private String documentSource; // "UPLOAD" or "GOOGLE_DRIVE"
    
    @Column(name = "file_path")
    private String filePath;
    
    @Column(name = "drive_link")
    private String driveLink;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "evaluation_score")
    private Double evaluationScore;
    
    @Column(name = "evaluation_feedback", columnDefinition = "TEXT")
    private String evaluationFeedback;
    
    @Column(name = "structure_score")
    private Double structureScore;
    
    @Column(name = "completeness_score")
    private Double completenessScore;
    
    @Column(name = "quality_score")
    private Double qualityScore;
    
    @Column(name = "evaluated_at")
    private LocalDateTime evaluatedAt;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        evaluatedAt = LocalDateTime.now();
    }
}
