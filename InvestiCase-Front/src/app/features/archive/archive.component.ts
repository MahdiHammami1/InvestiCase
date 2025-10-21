import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';

interface Case {
  id: number;
  mainType: string;
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
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  mainTypes = ['مدني', 'جزائي', 'إداري', 'محاضر وشكايات'];

  subTypesByMainType: { [key: string]: string[] } = {
    'مدني': [
      'أوامر بالدفع',
      'طلاق',
      'الأذون على العرائض',
      'التسوية القضائية',
      'الأكرية التجارية',
      'بيع العقارات المقولبة',
      'شغلي',
      'استعجالي',
      'قضايا التقديم',
      'الضمان الاجتماعي',
      'الاعتراض والتمس اعادة النظر',
      'استئناف قضايا حوادث الشغل والأمراض المهنية',
      'استئناف قرارات دوائر الشغل',
      'استئناف الأحكام المدنية الصادرة عن النواحي',
      'الحالة المدنية',
      'توزيع الأموال',
      'مدني',
      'عقلة الأجور والمرتبات',
      'حوادث الشغل',
      'التبني'
    ],
    'جزائي': [
      'جناحي أصلي',
      'جنائي إعتراضي',
      'جناحي إعتراضي',
      'جنائي أصلي',
      'تحقيق',
      'دائرة إتهام'
    ],
    'إداري': [
      'استعجالي',
      'أصلية'
    ],
    'محاضر وشكايات': [
      'محاضر وشكايات'
    ]
  };

  cases = signal<Case[]>([]);
  filteredCases = signal<Case[]>([]);
  caseNumberFilter = signal('');
  caseTypeFilter = signal('');
  phaseFilter = signal('');
  courtFilter = signal('');
  clientFilter = signal('');
  nextSessionFilter = signal('');
  mainTypeFilter = signal('');
  page = signal(1);
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Get the mainType from query parameters
    this.route.queryParams.subscribe(params => {
      if (params['mainType']) {
        console.log('Received mainType param:', params['mainType']);
        this.mainTypeFilter.set(params['mainType']);
      }
    });

    this.apiService.getCases().subscribe(data => {
      console.log('Received cases:', data);
      this.cases.set(data);
      this.applyFilters();
    });
  }

  setFilter(signalFn: (v: string) => void, value: string) {
    signalFn(value);
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.cases().filter(c => {
      const caseNumberMatch = this.caseNumberFilter() ? c.caseNumber?.toLowerCase().includes(this.caseNumberFilter().toLowerCase()) : true;
      const caseTypeMatch = this.caseTypeFilter() ? c.caseType?.toLowerCase().includes(this.caseTypeFilter().toLowerCase()) : true;
      const phaseMatch = this.phaseFilter() ? c.phase?.toLowerCase().includes(this.phaseFilter().toLowerCase()) : true;
      const courtMatch = this.courtFilter() ? c.court?.toLowerCase().includes(this.courtFilter().toLowerCase()) : true;
      const clientMatch = this.clientFilter() ? c.client?.toLowerCase().includes(this.clientFilter().toLowerCase()) : true;
      const nextSessionMatch = this.nextSessionFilter() ? c.nextSession === this.nextSessionFilter() : true;
      
      // Check if case type belongs to selected main type's subtypes
      const mainTypeMatch = this.mainTypeFilter() 
        ? this.subTypesByMainType[this.mainTypeFilter()]?.includes(c.caseType)
        : true;

      if (this.mainTypeFilter()) {
        console.log('Checking case:', c.caseType, 'against mainType:', this.mainTypeFilter(), 
          'subtypes:', this.subTypesByMainType[this.mainTypeFilter()],
          'match:', mainTypeMatch);
      }
      
      return caseNumberMatch && caseTypeMatch && phaseMatch && courtMatch && clientMatch && nextSessionMatch && mainTypeMatch;
    });
    this.filteredCases.set(filtered);
    this.page.set(1);
  }

  get paginatedCases() {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredCases().slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.page() * this.pageSize) < this.filteredCases().length) {
      this.page.set(this.page() + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }
}
