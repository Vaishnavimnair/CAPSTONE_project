import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private authSerive: AuthService,
    private router: Router // Injecting Router here
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSignIn() {
    const formData = this.signInForm.value;

    this.authSerive.authenticate(formData.email,formData.password).subscribe((response: any) => {
      console.log(response);
      
      let token = response.token;
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('authToken', token);

      // get user data
      this.authSerive.getUser(formData.email).subscribe( d => {
        // localStorage.setItem("user",d)
        // console.log(localStorage.getItem("user"))
        // console.log("yoooo",localStorage)
        localStorage.setItem("user", JSON.stringify(d));
        // Retrieve and parse the string back into an object when needed
        console.log(JSON.parse(localStorage.getItem("user") || '{}'));

        console.log(localStorage.getItem("user"));
        
      })
      // Redirect to another component, e.g., the dashboard
      this.router.navigate(["/home"]); // Change this to your target component
    });
  }
}