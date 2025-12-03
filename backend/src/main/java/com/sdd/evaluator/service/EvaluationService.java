package com.sdd.evaluator.service;

import com.sdd.evaluator.dto.EvaluationResponse;
import com.sdd.evaluator.entity.Evaluation;
import com.sdd.evaluator.entity.User;
import com.sdd.evaluator.repository.EvaluationRepository;
import com.sdd.evaluator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private AIEvaluationService aiEvaluationService;

    public EvaluationResponse evaluateUploadedFile(MultipartFile file) {
        User user = getCurrentUser();

        // Store the file
        String filename = fileStorageService.storeFile(file);

        // Read file content
        String content = fileStorageService.readFileContent(filename);

        // Create evaluation entity
        Evaluation evaluation = new Evaluation();
        evaluation.setUser(user);
        evaluation.setDocumentName(file.getOriginalFilename());
        evaluation.setDocumentSource("UPLOAD");
        evaluation.setFilePath(filename);
        evaluation.setContent(content);

        // Perform AI evaluation
        aiEvaluationService.evaluateDocument(evaluation);

        // Save evaluation
        evaluationRepository.save(evaluation);

        return convertToResponse(evaluation);
    }

    public EvaluationResponse evaluateGoogleDriveFile(String driveLink) {
        User user = getCurrentUser();

        // Extract file ID and fetch content
        String fileId = googleDriveService.extractFileIdFromLink(driveLink);
        String content = googleDriveService.fetchFileContent(fileId);

        // Create evaluation entity
        Evaluation evaluation = new Evaluation();
        evaluation.setUser(user);
        evaluation.setDocumentName("Google Drive Document: " + fileId);
        evaluation.setDocumentSource("GOOGLE_DRIVE");
        evaluation.setDriveLink(driveLink);
        evaluation.setContent(content);

        // Perform AI evaluation
        aiEvaluationService.evaluateDocument(evaluation);

        // Save evaluation
        evaluationRepository.save(evaluation);

        return convertToResponse(evaluation);
    }

    public List<EvaluationResponse> getEvaluationHistory() {
        User user = getCurrentUser();
        List<Evaluation> evaluations = evaluationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return evaluations.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private EvaluationResponse convertToResponse(Evaluation evaluation) {
        return EvaluationResponse.builder()
                .id(evaluation.getId())
                .documentName(evaluation.getDocumentName())
                .documentSource(evaluation.getDocumentSource())
                .evaluationScore(evaluation.getEvaluationScore())
                .evaluationFeedback(evaluation.getEvaluationFeedback())
                .structureScore(evaluation.getStructureScore())
                .completenessScore(evaluation.getCompletenessScore())
                .qualityScore(evaluation.getQualityScore())
                .evaluatedAt(evaluation.getEvaluatedAt())
                .createdAt(evaluation.getCreatedAt())
                .build();
    }
}
