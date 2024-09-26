import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wellness-service',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wellness-service.component.html',
  styleUrls: ['./wellness-service.component.css']
})
export class WellnessServiceComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
