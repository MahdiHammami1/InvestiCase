import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';

interface Case {
  id: number;
  caseNumber: string;
  caseType: string;
  phase: string;
  judicialYear: number;
  court: string;
  plaintiff: string;
  plaintiffPhone: string;
  opponent: string;
  lawyer: string;
  client: string;
  nextSession: string;
  subject: string;
  comments: string;
  document: any;
}

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {
  case = signal<Case | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getCaseById(id).subscribe({
        next: data => {
          this.case.set(data);
          this.loading.set(false);
        },
        error: err => {
          this.error.set('Case not found');
          this.loading.set(false);
        }
      });
    } else {
      this.error.set('No case ID provided');
      this.loading.set(false);
    }
  }

  getDocumentUrl(): string | null {
    const doc = this.case()?.document;
    if (doc) {
      // Convert byte[] to base64 for download
      return `data:application/octet-stream;base64,${btoa(String.fromCharCode(...doc))}`;
    }
    return null;
  }
}
