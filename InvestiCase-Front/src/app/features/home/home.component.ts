import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showSearch = false;
  caseTypes = ['مدني', 'جزائي', 'إداري', 'محاضر وشكايات'];
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


  constructor(private router: Router) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  searchByType(type: string) {
    this.router.navigate(['/archive'], { 
      queryParams: { mainType: type }
    });
  }
}