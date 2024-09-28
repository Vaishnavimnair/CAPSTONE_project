import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css'
})
export class FirstPageComponent {
  showPopup = false; // Property to manage the popup visibility

  constructor(private router: Router) {} // Inject Router service

  togglePopup() {
    this.showPopup = !this.showPopup; // Toggle the visibility of the popup
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the login route
  }

  navigateToSignup() {
    this.router.navigate(['/signup']); // Navigate to the signup route
  }
}
