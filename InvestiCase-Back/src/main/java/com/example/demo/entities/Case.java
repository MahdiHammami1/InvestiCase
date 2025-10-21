package com.example.demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Entity
@Table(name = "cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Case {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🧾 Identifiers
    private String caseNumber;       // replaces numCase
    private String caseType;         // replaces type (avoid reserved keyword)
    private String phase;            // e.g. "Investigation", "Trial", "Appeal"
    private int judicialYear;        // replaces judYear (clearer name)

    // ⚖️ Court info
    private String court;            // court name or code

    // 👤 Parties
    private String plaintiff;        // replaces Niyeba (the one filing the case)
    private String plaintiffPhone;   // replaces numTel
    private String opponent;         // opponent / defendant
    private String lawyer;           // assigned lawyer
    private String client;           // could be same as plaintiff (keep for clarity)

    // 🗓 Sessions
    private LocalDate nextSession;   // date of next hearing/session

    // 📄 Details
    private String subject;          // replaces Subject (field names lowercase)
    @Column(length = 1000)
    private String comments;

    // 📎 Attached document
    @Lob
    private byte[] document;
}
