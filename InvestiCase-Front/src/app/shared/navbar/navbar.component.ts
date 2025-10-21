import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {
  isOpen = false;
  dark = false;
  userName: string | null = null; // replace with real auth when available

  constructor(private router: Router) {
    // close menu on navigation
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.isOpen = false);
    // example: derive user initials from a placeholder
    this.userName = 'Mahdi';
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  toggleTheme() {
    this.dark = !this.dark;
    document.documentElement.classList.toggle('dark-theme', this.dark);
  }

  get userInitials() {
    if (!this.userName) return '';
    return this.userName.split(' ').map(n => n.charAt(0)).slice(0,2).join('').toUpperCase();
  }

  // close on ESC
  @HostListener('document:keydown.escape')
  onEsc() { this.close(); }
}
