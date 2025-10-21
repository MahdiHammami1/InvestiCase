package com.example.demo.services;

import com.example.demo.entities.Case;
import com.example.demo.repositories.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseService {
    private final CaseRepository caseRepository;

    @Autowired
    public CaseService(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    public List<Case> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<Case> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public Case saveCase(Case caseEntity) {
        return caseRepository.save(caseEntity);
    }

    public void deleteCase(Long id) {
        caseRepository.deleteById(id);
    }

    public List<Case> addCases(List<Case> cases) {
        return caseRepository.saveAll(cases);
    }

    public void deleteAllCases() {
        caseRepository.deleteAll();
    }
}
