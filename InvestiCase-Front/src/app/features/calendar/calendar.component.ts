import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

interface Case {
  id: string;
  caseNumber: string;
  caseType: string;
  nextSession: string;
  court: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weeks: Date[][] = [];
  currentWeek: Date[] = [];
  cases: { [key: string]: Case[] } = {};
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.generateCurrentWeek();
    this.fetchCases();
  }

  generateCurrentWeek() {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when Sunday
    
    const monday = new Date(today.setDate(diff));
    this.currentWeek = Array(7).fill(null).map((_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }

  fetchCases() {
    this.loading = true;
    const startDate = this.formatDate(this.currentWeek[0]);
    const endDate = this.formatDate(this.currentWeek[6]);
    
    this.apiService.getCasesByDateRange(startDate, endDate).subscribe({
      next: (cases) => {
        this.cases = this.groupCasesByDate(cases);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching cases:', error);
        this.loading = false;
      }
    });
  }

  groupCasesByDate(cases: Case[]): { [key: string]: Case[] } {
    const grouped: { [key: string]: Case[] } = {};
    cases.forEach(case_ => {
      const date = case_.nextSession.split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(case_);
    });
    return grouped;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  previousWeek() {
    const firstDay = new Date(this.currentWeek[0]);
    firstDay.setDate(firstDay.getDate() - 7);
    this.currentWeek = Array(7).fill(null).map((_, i) => {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() + i);
      return day;
    });
    this.fetchCases();
  }

  nextWeek() {
    const firstDay = new Date(this.currentWeek[0]);
    firstDay.setDate(firstDay.getDate() + 7);
    this.currentWeek = Array(7).fill(null).map((_, i) => {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() + i);
      return day;
    });
    this.fetchCases();
  }

  getDayName(date: Date): string {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  getCasesForDate(date: Date): Case[] {
    const dateStr = this.formatDate(date);
    return this.cases[dateStr] || [];
  }
}