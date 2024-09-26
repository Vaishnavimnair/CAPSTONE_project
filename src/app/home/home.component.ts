import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // note this should be 'styleUrls' (plural)
})
export class HomeComponent implements OnInit {
  sectionIndex: number = 0;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId); // Check if running in browser
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Only access document and perform DOM manipulation in browser environment
      const sections = document.querySelectorAll('.service-section');

      // Function to set the active section
      const setActiveSection = () => {
        sections.forEach((section, index) => {
          section.classList.remove('active');
          if (index === this.sectionIndex) {
            section.classList.add('active');
          }
        });

        // Move to the next section in 5 seconds, looping back to the first
        this.sectionIndex = (this.sectionIndex + 1) % sections.length;
      };

      // Initialize the first section
      setActiveSection();

      // Change section every 5 seconds
      setInterval(setActiveSection, 5000);
    }
  }
}
