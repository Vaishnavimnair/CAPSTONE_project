import { Component, OnInit } from '@angular/core';
import { HelplineService } from '../helplines.service';
import { CommonModule } from '@angular/common'; // Ensure this import is present

@Component({
  selector: 'app-helplines',
  standalone: true,
  templateUrl: './helplines.component.html',
  styleUrls: ['./helplines.component.css'],
  imports: [CommonModule], // Include CommonModule here
})
export class HelplinesComponent implements OnInit {
  helplines: any[] = []; // Initialize the array to hold helpline data

  constructor(private helplineService: HelplineService) {}

  ngOnInit() {
    this.helplineService.getHelplines().subscribe(
      data => {
        console.log('Helplines data:', data); // Log the fetched data for debugging
        this.helplines = data; // Assign fetched data to the helplines array
      },
      error => {
        console.error('Error fetching helplines:', error); // Log any errors
      }
    );
  }
}
