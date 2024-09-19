import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WellnessServiceComponent } from './wellness-service/wellness-service.component';
import { SafetyServiceComponent } from './safety-service/safety-service.component';
import { AboutUsComponent } from './about-us/about-us.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'wellness', component: WellnessServiceComponent },
    { path: 'safety', component: SafetyServiceComponent }, 
    { path: 'aboutus', component: AboutUsComponent },
    { path: '**', redirectTo: '' }  
];
