import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { ArticlesComponent } from './app/articles/articles.component';
import { HelplinesComponent } from './app/helplines/helplines.component';
import { SurveyComponent } from './app/survey/survey.component';
import { HomeComponent } from './app/home/home.component';
import { SafetyServiceComponent } from './app/safety-service/safety-service.component';
import { AboutUsComponent } from './app/about-us/about-us.component';
import { FormsModule } from '@angular/forms'; 
import { WellnessServiceComponent } from './app/wellness-service/wellness-service.component';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { RouterModule } from '@angular/router';
import { HelplineService } from './app/helplines.service';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // Use provideHttpClient here
});


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'safety', component: SafetyServiceComponent },
  { path: 'wellness', component: WellnessServiceComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'helplines', component: HelplinesComponent },
  { path: 'survey', component: SurveyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    HttpClient, // Add HttpClientModule here
    FormsModule // Add FormsModule here
  ]
}).catch(err => console.error(err));
