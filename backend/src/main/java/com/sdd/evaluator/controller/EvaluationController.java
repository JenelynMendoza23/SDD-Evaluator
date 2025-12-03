package com.sdd.evaluator.controller;

import com.sdd.evaluator.dto.EvaluationRequest;
import com.sdd.evaluator.dto.EvaluationResponse;
import com.sdd.evaluator.service.EvaluationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAndEvaluate(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please select a file to upload");
            }

            EvaluationResponse response = evaluationService.evaluateUploadedFile(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing file: " + e.getMessage());
        }
    }

    @PostMapping("/drive")
    public ResponseEntity<?> evaluateDriveFile(@Valid @RequestBody EvaluationRequest request) {
        try {
            EvaluationResponse response = evaluationService.evaluateGoogleDriveFile(request.getDriveLink());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing Google Drive file: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<EvaluationResponse>> getHistory() {
        List<EvaluationResponse> history = evaluationService.getEvaluationHistory();
        return ResponseEntity.ok(history);
    }
}
