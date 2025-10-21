package com.example.demo.controllers;

import com.example.demo.entities.Case;
import com.example.demo.services.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cases")
public class CaseController {
    private final CaseService caseService;

    @Autowired
    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping
    public List<Case> getAllCases() {
        return caseService.getAllCases();
    }

    @GetMapping("/{id}")
    public Optional<Case> getCaseById(@PathVariable Long id) {
        return caseService.getCaseById(id);
    }

    @PostMapping
    public Case createCase(@RequestBody Case caseEntity) {
        if (caseEntity.getJudicialYear() == 0) {
            throw new IllegalArgumentException("Le champ judicialYear est obligatoire et ne peut pas être nul ou zéro.");
        }
        return caseService.saveCase(caseEntity);
    }

    @PutMapping("/{id}")
    public Case updateCase(@PathVariable Long id, @RequestBody Case caseEntity) {
        Optional<Case> existingCaseOpt = caseService.getCaseById(id);
        if (existingCaseOpt.isEmpty()) {
            throw new RuntimeException("Case not found with id: " + id);
        }
        Case existingCase = existingCaseOpt.get();
        // Mettre à jour les champs
        existingCase.setCaseNumber(caseEntity.getCaseNumber());
        existingCase.setCaseType(caseEntity.getCaseType());
        existingCase.setPhase(caseEntity.getPhase());
        existingCase.setJudicialYear(caseEntity.getJudicialYear());
        existingCase.setCourt(caseEntity.getCourt());
        existingCase.setPlaintiff(caseEntity.getPlaintiff());
        existingCase.setPlaintiffPhone(caseEntity.getPlaintiffPhone());
        existingCase.setOpponent(caseEntity.getOpponent());
        existingCase.setLawyer(caseEntity.getLawyer());
        existingCase.setClient(caseEntity.getClient());
        existingCase.setNextSession(caseEntity.getNextSession());
        existingCase.setSubject(caseEntity.getSubject());
        existingCase.setComments(caseEntity.getComments());
        existingCase.setDocument(caseEntity.getDocument());
        return caseService.saveCase(existingCase);
    }

    @DeleteMapping("/{id}")
    public void deleteCase(@PathVariable Long id) {
        caseService.deleteCase(id);
    }

    @PostMapping("/addCases")
    public List<Case> addCases(@RequestBody List<Case> cases) {
        return caseService.addCases(cases);
    }

    @DeleteMapping("/all")
    public void deleteAllCases() {
        caseService.deleteAllCases();
    }
}
