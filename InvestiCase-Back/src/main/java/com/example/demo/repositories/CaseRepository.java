package com.example.demo.repositories;

import com.example.demo.entities.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CaseRepository extends JpaRepository<Case, Long> {
}

