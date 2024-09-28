// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { SurveyService } from '../survey.service'; // Import the service

// @Component({
//   selector: 'app-survey',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './survey.component.html',
//   styleUrls: ['./survey.component.css'],
// })
// export class SurveyComponent implements OnInit { // Implement OnInit
//   surveyTitle: string = 'Customer Satisfaction Survey';
//   questions: any[] = [];
//   currentQuestionIndex: number = 0;
//   result: string = '';

//   constructor(private surveyService: SurveyService) {} // Inject the service

//   ngOnInit() {
//     this.surveyService.getQuestions().subscribe(questions => {
//       this.questions = questions; // Assign the questions from the service
//     });
//   }

//   nextQuestion() {
//     if (this.currentQuestionIndex < this.questions.length - 1) {
//       this.currentQuestionIndex++;
//     }
//   }

//   previousQuestion() {
//     if (this.currentQuestionIndex > 0) {
//       this.currentQuestionIndex--;
//     }
//   }

//   isLastQuestion() {
//     return this.currentQuestionIndex === this.questions.length - 1;
//   }

//   submitSurvey() {
//     const answers = this.questions.map(q => q.answer);
//     this.result = `Thank you for completing the survey! Your answers: ${JSON.stringify(answers)}`;
//     // Resetting the survey
//     this.currentQuestionIndex = 0;
//     this.questions.forEach(q => q.answer = '');
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey.service'; // Import the service
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveyTitle: string = 'Depression Awareness Survey';
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  result: string = '';
  surveyCompleted: boolean = false; // Track if survey is completed

  // Define the scoring for each option
  optionPoints: { [key: string]: number } = {
    Never: 1,
    Rarely: 2,
    Sometimes: 3,
    Often: 4,
    Always: 5,
  };

  constructor(private surveyService: SurveyService) {} // Inject the service

  ngOnInit() {
    this.resetSurvey(); // Reset survey when component initializes
  }

  resetSurvey() {
    this.surveyService.getQuestions().subscribe(questions => {
      this.questions = questions.map(q => ({ ...q, answer: '' })); // Reset answers
      this.currentQuestionIndex = 0; // Reset to first question
      this.surveyCompleted = false; // Ensure survey is not marked as completed
    });
  }

  nextQuestion() {
    if (this.canMoveToNext()) {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  isLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  canMoveToNext() {
    // Ensure that an answer is selected before moving to the next question
    return this.questions[this.currentQuestionIndex].answer !== '';
  }

  submitSurvey() {
    const totalScore = this.questions.reduce((acc, question) => {
      const answer = question.answer;
      return acc + this.optionPoints[answer]; // Calculate total score based on selected answers
    }, 0);

    this.result = this.getResultMessage(totalScore); // Get result message based on total score
    this.surveyCompleted = true; // Mark survey as completed
  }

  getResultMessage(score: number): string {
    if (score >= 40) {
      return "You are very depressed; you might need help, or talk to someone.";
    } else if (score >= 30) {
      return "You are moderately depressed; consider talking to someone.";
    } else if (score >= 20) {
      return "You may be experiencing some depressive symptoms.";
    } else if (score >= 11) {
      return "You're doing okay, but it’s always good to check in with yourself.";
    } else {
      return "You're positive and doing amazing in your life!";
    }
  }
}




