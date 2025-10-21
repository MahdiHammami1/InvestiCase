import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}cases`);
  }

  getCaseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}cases/${id}`);
  }

  getCasesByDateRange(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}cases?startDate=${startDate}&endDate=${endDate}`);
  }

  createCase(caseData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}cases`, caseData);
  }
}