package com.sdd.evaluator.service;

import com.sdd.evaluator.entity.Evaluation;
import org.springframework.stereotype.Service;

/**
 * Placeholder AI Evaluation Service
 * This service provides mock AI evaluation functionality
 * In production, this would integrate with actual AI/ML models
 */
@Service
public class AIEvaluationService {

    public void evaluateDocument(Evaluation evaluation) {
        // Placeholder AI evaluation logic
        // In a real implementation, this would:
        // 1. Parse the document content
        // 2. Send to AI model for analysis
        // 3. Receive and process AI response
        
        String content = evaluation.getContent();
        
        // Mock evaluation scores (70-95 range for realistic scores)
        double structureScore = calculateMockScore(content, "structure");
        double completenessScore = calculateMockScore(content, "completeness");
        double qualityScore = calculateMockScore(content, "quality");
        
        double overallScore = (structureScore + completenessScore + qualityScore) / 3.0;
        
        evaluation.setStructureScore(structureScore);
        evaluation.setCompletenessScore(completenessScore);
        evaluation.setQualityScore(qualityScore);
        evaluation.setEvaluationScore(overallScore);
        
        // Generate mock feedback
        String feedback = generateMockFeedback(structureScore, completenessScore, qualityScore);
        evaluation.setEvaluationFeedback(feedback);
    }
    
    private double calculateMockScore(String content, String category) {
        // Simple mock scoring based on content length and category
        int contentLength = content != null ? content.length() : 0;
        
        // Base score between 70-85
        double baseScore = 70.0 + (Math.random() * 15.0);
        
        // Bonus for content length (up to 10 points)
        double lengthBonus = Math.min(10.0, contentLength / 100.0);
        
        return Math.round((baseScore + lengthBonus) * 10.0) / 10.0;
    }
    
    private String generateMockFeedback(double structure, double completeness, double quality) {
        StringBuilder feedback = new StringBuilder();
        
        feedback.append("## Evaluation Summary\n\n");
        
        feedback.append("### Structure Analysis (").append(structure).append("/100)\n");
        if (structure >= 85) {
            feedback.append("- Excellent document structure with clear sections and logical flow\n");
            feedback.append("- Well-organized content hierarchy\n");
        } else if (structure >= 70) {
            feedback.append("- Good document structure with minor improvements needed\n");
            feedback.append("- Consider adding more subsections for clarity\n");
        } else {
            feedback.append("- Document structure needs improvement\n");
            feedback.append("- Review section organization and hierarchy\n");
        }
        
        feedback.append("\n### Completeness Analysis (").append(completeness).append("/100)\n");
        if (completeness >= 85) {
            feedback.append("- Comprehensive coverage of all required sections\n");
            feedback.append("- All key design elements are well documented\n");
        } else if (completeness >= 70) {
            feedback.append("- Most sections are complete with some gaps\n");
            feedback.append("- Consider adding more details in implementation sections\n");
        } else {
            feedback.append("- Several sections are incomplete or missing\n");
            feedback.append("- Add more detail to key design areas\n");
        }
        
        feedback.append("\n### Quality Analysis (").append(quality).append("/100)\n");
        if (quality >= 85) {
            feedback.append("- High-quality content with clear explanations\n");
            feedback.append("- Professional documentation standards maintained\n");
        } else if (quality >= 70) {
            feedback.append("- Good quality with room for improvement\n");
            feedback.append("- Enhance clarity in technical descriptions\n");
        } else {
            feedback.append("- Quality improvements needed\n");
            feedback.append("- Review for clarity and technical accuracy\n");
        }
        
        return feedback.toString();
    }
}
